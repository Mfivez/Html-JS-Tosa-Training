import fs from "node:fs";
import vm from "node:vm";

const domains = ["html", "css", "javascript", "dom", "integration"];
const app = fs.readFileSync("app.js", "utf8");

if (!app.includes("ensureDocumentShell")) {
  throw new Error("Le runner sandbox doit garantir document.head/document.body avant execution.");
}
if (!app.includes("<body>")) {
  throw new Error("Le srcdoc du runner sandbox doit creer un body avant le script.");
}

const questions = domains.flatMap((domain) =>
  JSON.parse(fs.readFileSync(`data/questions/${domain}.json`, "utf8"))
);
const executableQuestions = questions.filter((question) => Array.isArray(question.tests));

async function main() {
  let executed = 0;
  let rejectedBrokenAnswers = 0;
  for (const question of executableQuestions) {
    const code = question.solution ?? question.code ?? "";
    for (const test of question.tests) {
      const result = await runExecutableTest(code, test);
      executed += 1;
      if (!result.pass) {
        throw new Error(`${question.id} / ${test.label ?? test.type}: ${result.details}`);
      }
    }

    if (question.type === "code-fix") {
      const originalResults = [];
      for (const test of question.tests) {
        originalResults.push(await runExecutableTest(question.code ?? "", test));
      }
      if (originalResults.every((result) => result.pass)) {
        throw new Error(`${question.id}: le code initial errone passe tous les tests sandbox.`);
      }
      rejectedBrokenAnswers += 1;
    }
  }

  console.log(`Sandbox tests OK: ${executed} test(s) executes sur ${executableQuestions.length} question(s), ${rejectedBrokenAnswers} code-fix errones rejetes.`);
}

async function runExecutableTest(userCode, test) {
  const document = new MiniDocument();
  const logs = [];
  const context = createExecutionContext(document, logs);

  try {
    document.body.innerHTML = test.fixture || "";
    exposeIdGlobals(context, document);

    if (test.type === "html") {
      applyHtml(document, userCode);
    } else if (test.type === "source") {
      // Raw source checks intentionally avoid HTML parser auto-repair.
    } else if (test.type === "css") {
      applyCss(document, userCode);
    } else if (test.type === "page") {
      const [markup, behavior] = splitPageCode(userCode);
      document.body.innerHTML = markup;
      exposeIdGlobals(context, document);
      if (test.mode === "html-css") {
        applyCss(document, behavior);
      } else if (test.mode === "html-js") {
        await executeScript(context, [test.before || "", behavior, test.after || ""].join("\n"));
      }
    } else {
      await executeScript(context, [test.before || "", userCode, test.after || ""].join("\n"));
    }

    await runActions(document, test.actions ?? []);

    if (test.type === "console") {
      const expected = test.expectedLogs ?? [];
      return {
        pass: JSON.stringify(logs) === JSON.stringify(expected),
        details: `Attendu: ${expected.join(", ")} | Obtenu: ${logs.join(", ")}`
      };
    }

    if (test.type === "source") {
      const assertions = test.assertions ?? [];
      const failures = assertions
        .map((assertion) => ({
          pass: compareSource(userCode, assertion),
          details: assertion.label ?? "Source attendue"
        }))
        .filter((result) => !result.pass);
      return {
        pass: assertions.length > 0 && failures.length === 0,
        details: failures.map((failure) => failure.details).join(" ; ") || "OK"
      };
    }

    const assertions = test.assertions ?? [];
    const failures = assertions
      .map((assertion) => checkAssertion(document, assertion))
      .filter((result) => !result.pass);
    return {
      pass: assertions.length > 0 && failures.length === 0,
      details: failures.map((failure) => failure.details).join(" ; ") || "OK"
    };
  } catch (error) {
    return { pass: false, details: error.message };
  }
}

function createExecutionContext(document, logs) {
  const context = {
    document,
    console: {
      log: (...args) => logs.push(args.map(stringifyLog).join(" "))
    },
    Event: MiniEvent,
    MouseEvent: MiniEvent,
    Promise,
    Error,
    String,
    Number,
    Boolean,
    Array,
    Object,
    Set,
    Map,
    JSON,
    Math,
    RegExp,
    setTimeout
  };
  context.globalThis = context;
  return vm.createContext(context);
}

async function executeScript(context, source) {
  const script = new vm.Script(`(async () => {\n${source}\n})()`);
  const result = script.runInContext(context, { timeout: 1000 });
  if (result && typeof result.then === "function") await result;
}

async function runActions(document, actions) {
  for (const action of actions) {
    if (action.click) {
      document.querySelector(action.click)?.dispatchEvent(new MiniEvent("click", { bubbles: true }));
    }
    if (action.input) {
      const target = document.querySelector(action.input);
      if (target) {
        target.value = action.value ?? "";
        target.dispatchEvent(new MiniEvent("input", { bubbles: true }));
      }
    }
    if (action.wait) await new Promise((resolve) => setTimeout(resolve, action.wait));
  }
}

function checkAssertion(document, assertion) {
  const element = document.querySelector(assertion.selector);
  const actual = readAssertionValue(document, element, assertion);
  const pass = Boolean(element) && compare(actual, assertion);
  return {
    pass,
    details: `${assertion.selector} -> ${actual || "(vide)"}`
  };
}

function readAssertionValue(document, element, assertion) {
  if (!element) return "";
  if (assertion.count) return String(document.querySelectorAll(assertion.selector).length);
  if (assertion.computed) return document.getComputedStyle(element).getPropertyValue(assertion.computed);
  if (assertion.attribute) return element.getAttribute(assertion.attribute) ?? "";
  return String(element[assertion.property || "textContent"] ?? "");
}

function compare(actual, assertion) {
  if (assertion.equals !== undefined) return actual === String(assertion.equals);
  if (assertion.contains !== undefined) return actual.includes(String(assertion.contains));
  if (assertion.matches !== undefined) return new RegExp(assertion.matches, assertion.flags || "").test(actual);
  return false;
}

function compareSource(source, assertion) {
  const contains = Array.isArray(assertion.contains) ? assertion.contains : assertion.contains ? [assertion.contains] : [];
  const absent = Array.isArray(assertion.absent) ? assertion.absent : assertion.absent ? [assertion.absent] : [];
  const containsOk = contains.every((needle) => source.includes(needle));
  const absentOk = absent.every((needle) => !source.includes(needle));
  const regexOk = assertion.regex ? new RegExp(assertion.regex, assertion.flags ?? "").test(source) : true;
  return containsOk && absentOk && regexOk;
}

function splitPageCode(userCode) {
  const match = userCode.match(/\n\s*\n/);
  if (!match) return ["", userCode];
  return [userCode.slice(0, match.index), userCode.slice(match.index + match[0].length)];
}

function exposeIdGlobals(context, document) {
  document.querySelectorAll("[id]").forEach((element) => {
    context[element.id] = element;
  });
}

function stringifyLog(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch (_error) {
    return String(value);
  }
}

class MiniEvent {
  constructor(type, options = {}) {
    this.type = type;
    this.bubbles = options.bubbles ?? false;
    this.target = null;
    this.currentTarget = null;
    this.defaultPrevented = false;
  }

  preventDefault() {
    this.defaultPrevented = true;
  }

  stopPropagation() {
    this.bubbles = false;
  }
}

class MiniDocument {
  constructor() {
    this.documentElement = new MiniElement("html", {}, this);
    this.head = new MiniElement("head", {}, this);
    this.body = new MiniElement("body", {}, this);
    this.styleRules = [];
    this.documentElement.append(this.head);
    this.documentElement.append(this.body);
  }

  createElement(tagName) {
    return new MiniElement(tagName, {}, this);
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] ?? null;
  }

  querySelectorAll(selector) {
    return [this.documentElement, this.head, this.body, ...this.body.querySelectorAll(selector), ...this.head.querySelectorAll(selector)]
      .filter((element) => matchesSelectorChain(element, selector));
  }

  getComputedStyle(element) {
    return {
      getPropertyValue: (property) => getComputedProperty(this, element, property)
    };
  }
}

class MiniElement {
  constructor(tagName, attributes = {}, ownerDocument = null) {
    this.tagName = tagName.toLowerCase();
    this.attributes = { ...attributes };
    this.children = [];
    this.parentElement = null;
    this.ownerDocument = ownerDocument;
    this.listeners = {};
    this._text = "";
    this.value = attributes.value ?? "";
  }

  get id() {
    return this.attributes.id ?? "";
  }

  get className() {
    return this.attributes.class ?? "";
  }

  set className(value) {
    this.attributes.class = value;
  }

  get dataset() {
    return Object.fromEntries(
      Object.entries(this.attributes)
        .filter(([key]) => key.startsWith("data-"))
        .map(([key, value]) => [toCamelCase(key.slice(5)), value])
    );
  }

  get classList() {
    return {
      add: (...classes) => {
        const current = new Set(this.className.split(/\s+/).filter(Boolean));
        classes.forEach((item) => current.add(item));
        this.className = [...current].join(" ");
      },
      toggle: (className) => {
        const current = new Set(this.className.split(/\s+/).filter(Boolean));
        const active = !current.has(className);
        if (active) current.add(className);
        else current.delete(className);
        this.className = [...current].join(" ");
        return active;
      },
      contains: (className) => this.className.split(/\s+/).includes(className)
    };
  }

  get textContent() {
    return `${this._text}${this.children.map((child) => child.textContent).join("")}`;
  }

  set textContent(value) {
    this._text = String(value);
    this.children = [];
  }

  get innerHTML() {
    return this.children.map((child) => child.outerHTML).join("");
  }

  set innerHTML(value) {
    this.children = parseHtml(String(value), this.ownerDocument);
    this.children.forEach((child) => {
      child.parentElement = this;
    });
  }

  get outerHTML() {
    const attrs = Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    return `<${this.tagName}${attrs ? ` ${attrs}` : ""}>${this.textContent}</${this.tagName}>`;
  }

  append(...items) {
    items.forEach((item) => {
      if (item instanceof MiniElement) {
        item.parentElement = this;
        if (!item.ownerDocument) item.ownerDocument = this.ownerDocument;
        this.children.push(item);
      } else {
        const text = new MiniElement("#text", {}, this.ownerDocument);
        text.textContent = String(item);
        text.parentElement = this;
        this.children.push(text);
      }
    });
  }

  prepend(item) {
    if (item instanceof MiniElement) {
      item.parentElement = this;
      this.children.unshift(item);
    }
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name] ?? null;
  }

  addEventListener(type, listener) {
    this.listeners[type] = [...(this.listeners[type] ?? []), listener];
  }

  dispatchEvent(event) {
    if (!event.target) event.target = this;
    event.currentTarget = this;
    (this.listeners[event.type] ?? []).forEach((listener) => listener.call(this, event));
    if (event.bubbles && this.parentElement) this.parentElement.dispatchEvent(event);
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matchesSelector(current, selector)) return current;
      current = current.parentElement;
    }
    return null;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] ?? null;
  }

  querySelectorAll(selector) {
    return getDescendants(this).filter((element) => matchesSelectorChain(element, selector));
  }
}

function parseHtml(html, ownerDocument) {
  const root = new MiniElement("root", {}, ownerDocument);
  const stack = [root];
  const tokenPattern = /<\/?[^>]+>|[^<]+/g;
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
  let token;

  while ((token = tokenPattern.exec(html))) {
    const value = token[0];
    if (value.startsWith("</")) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    if (value.startsWith("<")) {
      const tagMatch = value.match(/^<\s*([a-zA-Z0-9-]+)/);
      if (!tagMatch) continue;
      const tagName = tagMatch[1].toLowerCase();
      const element = new MiniElement(tagName, parseAttributes(value), ownerDocument);
      stack.at(-1).append(element);
      if (!voidTags.has(tagName) && !value.endsWith("/>")) stack.push(element);
      continue;
    }
    const text = value.replace(/\s+/g, " ");
    if (text.trim()) stack.at(-1)._text += text.trim();
  }

  return root.children;
}

function parseAttributes(tag) {
  const attrs = {};
  const attrPattern = /([:@a-zA-Z0-9_-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  attrPattern.lastIndex = tag.indexOf(" ");
  while ((match = attrPattern.exec(tag))) {
    const name = match[1];
    if (name === tag.match(/^<\s*([a-zA-Z0-9-]+)/)?.[1]) continue;
    attrs[name] = match[3] ?? match[4] ?? match[5] ?? "";
  }
  return attrs;
}

function getDescendants(element) {
  return element.children.flatMap((child) => (
    child.tagName === "#text" ? [] : [child, ...getDescendants(child)]
  ));
}

function matchesSelectorChain(element, selector) {
  const parts = selector.trim().split(/\s+/);
  if (!matchesSelector(element, parts.at(-1))) return false;
  let current = element.parentElement;
  for (let index = parts.length - 2; index >= 0; index -= 1) {
    while (current && !matchesSelector(current, parts[index])) {
      current = current.parentElement;
    }
    if (!current) return false;
    current = current.parentElement;
  }
  return true;
}

function matchesSelector(element, selector) {
  const clean = selector.trim();
  if (!clean || element.tagName === "#text") return false;
  const pseudo = clean.match(/:(first-child|last-child)$/)?.[1] ?? null;
  const base = clean.replace(/:(first-child|last-child)$/, "");
  if (pseudo && !matchesPseudo(element, pseudo)) return false;

  const attrMatches = [...base.matchAll(/\[([^\]=]+)(?:=["']?([^"'\]]+)["']?)?\]/g)];
  const withoutAttrs = base.replace(/\[[^\]]+\]/g, "");
  const id = withoutAttrs.match(/#([a-zA-Z0-9_-]+)/)?.[1];
  const classes = [...withoutAttrs.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map((match) => match[1]);
  const tag = withoutAttrs.replace(/[#.][a-zA-Z0-9_-]+/g, "") || null;

  if (tag && tag.toLowerCase() !== element.tagName) return false;
  if (id && element.id !== id) return false;
  if (classes.some((className) => !element.className.split(/\s+/).includes(className))) return false;
  return attrMatches.every((match) => {
    const actual = element.getAttribute(match[1]);
    return match[2] === undefined ? actual !== null : actual === match[2];
  });
}

function matchesPseudo(element, pseudo) {
  if (!element.parentElement) return false;
  const siblings = element.parentElement.children.filter((child) => child.tagName !== "#text");
  if (pseudo === "first-child") return siblings[0] === element;
  if (pseudo === "last-child") return siblings.at(-1) === element;
  return false;
}

function applyCss(document, css) {
  document.styleRules.push(...parseCss(css));
}

function applyHtml(document, html) {
  if (/<html[\s>]/i.test(html)) {
    const htmlTag = html.match(/<html[^>]*>/i)?.[0] ?? "<html>";
    Object.entries(parseAttributes(htmlTag)).forEach(([name, value]) => {
      document.documentElement.setAttribute(name, value);
    });
    const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
    document.body.innerHTML = body;
    return;
  }
  document.body.innerHTML = html;
}

function parseCss(css) {
  const rules = [];
  const normalized = css.replace(/@media[^{]+\{([\s\S]*)\}\s*$/g, "$1");
  const rulePattern = /([^{}]+)\{([^{}]+)\}/g;
  let match;
  while ((match = rulePattern.exec(normalized))) {
    const selector = match[1].trim();
    const declarations = Object.fromEntries(
      match[2].split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
          const [property, ...value] = part.split(":");
          return [property.trim(), value.join(":").trim()];
        })
    );
    rules.push({ selector, declarations });
  }
  return rules;
}

function getComputedProperty(document, element, property) {
  const declarations = {};
  document.styleRules.forEach((rule) => {
    if (matchesSelectorChain(element, rule.selector)) Object.assign(declarations, rule.declarations);
  });

  if (property === "display") return declarations.display ?? defaultDisplay(element);
  if (property === "width") return normalizeLength(declarations.width);
  if (property === "font-size") return normalizeLength(declarations["font-size"] ?? "16px");
  if (property === "padding-top") return normalizeLength(declarations["padding-top"] ?? declarations.padding ?? "0px");
  if (property === "margin-top") return normalizeLength(declarations["margin-top"] ?? declarations.margin ?? "8px");
  if (property === "color") return normalizeColor(resolveVar(document, declarations.color));
  if (property === "background-color") return normalizeColor(resolveVar(document, declarations["background-color"] ?? declarations.background));
  if (property === "grid-template-columns") return normalizeGridColumns(declarations["grid-template-columns"]);
  return declarations[property] ?? "";
}

function resolveVar(document, value = "") {
  const match = value.match(/^var\((--[a-zA-Z0-9_-]+)(?:,\s*([^)]+))?\)$/);
  if (!match) return value;
  const rootRule = document.styleRules.find((rule) => rule.selector === ":root");
  return rootRule?.declarations[match[1]] ?? match[2] ?? "";
}

function normalizeLength(value = "") {
  const trimmed = String(value).trim();
  if (trimmed === "0") return "0px";
  if (/^[0-9.]+px$/.test(trimmed)) return trimmed;
  if (/^[0-9.]+rem$/.test(trimmed)) return `${Number(trimmed.replace("rem", "")) * 16}px`;
  if (trimmed.startsWith("clamp(")) return "24px";
  return "";
}

function normalizeColor(value = "") {
  const colors = { red: "rgb(255, 0, 0)", green: "rgb(0, 128, 0)", blue: "rgb(0, 0, 255)", navy: "rgb(0, 0, 128)", teal: "rgb(0, 128, 128)" };
  const trimmed = String(value).trim();
  if (colors[trimmed]) return colors[trimmed];
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    const int = Number.parseInt(trimmed.slice(1), 16);
    return `rgb(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255})`;
  }
  return trimmed;
}

function normalizeGridColumns(value = "") {
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  if (trimmed === "1fr") return "300px";
  if (trimmed.includes("repeat(") || trimmed.includes("minmax(")) return "220px 220px";
  if (/^[0-9.]+px( [0-9.]+px)*$/.test(trimmed)) return trimmed;
  return "300px";
}

function defaultDisplay(element) {
  return ["div", "section", "article", "main", "nav", "p", "h1", "ul", "li"].includes(element.tagName) ? "block" : "inline";
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_match, char) => char.toUpperCase());
}

await main();
