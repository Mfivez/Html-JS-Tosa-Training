const els = {
  courseList: document.querySelector("#courseList"),
  chapterList: document.querySelector("#chapterList"),
  sidebar: document.querySelector("#courseSidebar"),
  sidebarSubtitle: document.querySelector("#sidebarSubtitle"),
  navToggle: document.querySelector("#navToggle"),
  navOverlay: document.querySelector("#navOverlay"),
  breadcrumb: document.querySelector("#breadcrumb"),
  content: document.querySelector("#content"),
  pager: document.querySelector("#pager"),
  main: document.querySelector("#main")
};

const state = {
  manifest: null,
  search: "",
  navOpen: window.matchMedia("(min-width: 861px)").matches,
  routeKey: null
};

async function loadManifest() {
  const response = await fetch("manifest.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Impossible de charger manifest.json. Lance `node scripts/build-manifest.mjs` ou verifie le workflow GitHub Pages.");
  }

  return response.json();
}

function getRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean).map(decodeURIComponent);

  return {
    courseId: parts[0] ?? null,
    chapterId: parts[1] ?? null
  };
}

function routeHref(courseId = null, chapterId = null) {
  if (!courseId) return "#/";

  const safeCourse = encodeURIComponent(courseId);
  const safeChapter = chapterId ? `/${encodeURIComponent(chapterId)}` : "";
  return `#/${safeCourse}${safeChapter}`;
}

function routeKey(route) {
  return `${route.courseId ?? ""}/${route.chapterId ?? ""}`;
}

function firstChapterHref(course) {
  return course?.chapters?.[0] ? routeHref(course.id, course.chapters[0].id) : routeHref(course?.id);
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getFilteredCourses() {
  const q = normalize(state.search.trim());

  if (!q) return state.manifest.courses;

  return state.manifest.courses
    .map((course) => {
      const courseMatches = normalize(`${course.title} ${course.description} ${course.id}`).includes(q);
      const matchingChapters = course.chapters.filter((chapter) =>
        normalize(`${chapter.title} ${chapter.id} ${chapter.file}`).includes(q)
      );

      if (courseMatches) return course;
      if (matchingChapters.length > 0) return { ...course, chapters: matchingChapters };
      return null;
    })
    .filter(Boolean);
}

function findCurrent() {
  const route = getRoute();
  const courses = state.manifest.courses;
  const course = route.courseId ? courses.find((item) => item.id === route.courseId) ?? null : null;
  const chapter = route.chapterId && course
    ? course.chapters.find((item) => item.id === route.chapterId) ?? null
    : null;
  const chapterIndex = course && chapter
    ? course.chapters.findIndex((item) => item.id === chapter.id)
    : -1;

  return { route, course, chapter, chapterIndex };
}

function renderCourses() {
  els.courseList.innerHTML = `
    <a href="${routeHref()}">
      <strong>Retour &agrave; l'accueil</strong>
      <small>Catalogue des formations</small>
    </a>
  `;
}

function renderChapters(course, currentChapterId) {
  if (!course) {
    els.chapterList.innerHTML = `<div class="nav-empty">Choisis un cours</div>`;
    return;
  }

  const chapters = course.chapters;

  if (chapters.length === 0) {
    els.chapterList.innerHTML = `<div class="nav-empty">Aucun chapitre</div>`;
    return;
  }

  els.chapterList.innerHTML = chapters
    .map((chapter, index) => {
      const active = chapter.id === currentChapterId ? "active" : "";
      return `
        <a class="${active}" href="${routeHref(course.id, chapter.id)}">
          <span class="chapter-index">${String(index + 1).padStart(2, "0")}</span>
          ${escapeHtml(chapter.title)}
        </a>
      `;
    })
    .join("");
}

async function renderContent(course, chapter, route) {
  document.body.classList.toggle("is-home", !route.courseId);
  els.main.classList.toggle("is-home", !route.courseId);
  els.sidebarSubtitle.textContent = course?.title ?? "Navigation du cours";
  syncNavState();

  if (!route.courseId) {
    renderHome();
    return;
  }

  if (!course) {
    renderNotFound(route.courseId);
    return;
  }

  if (!chapter) {
    renderCourseOverview(course);
    return;
  }

  els.breadcrumb.innerHTML = renderBreadcrumb([
    ["Formations", routeHref()],
    [course.title, routeHref(course.id)],
    [chapter.title]
  ]);

  const response = await fetch(chapter.file, { cache: "no-store" });

  if (!response.ok) {
    els.content.innerHTML = `
      <div class="error-box">
        <h1>Chapitre introuvable</h1>
        <p>Fichier attendu : <code>${escapeHtml(chapter.file)}</code></p>
      </div>
    `;
    return;
  }

  const markdown = await response.text();
  const html = parseMarkdown(markdown);
  els.content.className = "content markdown-content";
  els.content.innerHTML = html;
  fixRelativeUrls(els.content, course, chapter);
  addHeadingAnchors(els.content);
  initTosaActivities(els.content);
  els.content.focus({ preventScroll: true });
}

function renderHome() {
  const courses = getFilteredCourses();
  const activeSearch = document.activeElement?.id === "homeSearchInput";
  const cursor = activeSearch ? document.activeElement.selectionStart : null;

  els.breadcrumb.innerHTML = "";
  els.content.className = "content home-content";
  els.pager.innerHTML = "";

  els.content.innerHTML = `
    <section class="home-hero" aria-labelledby="homeTitle">
      <p class="eyebrow">Pr&eacute;paration certification</p>
      <h1 id="homeTitle">TOSA Web</h1>
      <p class="hero-copy">Entra&icirc;nement statique pour GitHub Pages : HTML, CSS, JavaScript, QCM simples ou multi-r&eacute;ponses, corrections de code et associations comme dans un test technique.</p>
      <label class="home-search" for="homeSearchInput">
        <span>Recherche rapide</span>
        <input id="homeSearchInput" type="search" placeholder="Rechercher un th&egrave;me, une balise, un exercice..." autocomplete="off" value="${escapeHtml(state.search)}" />
      </label>
    </section>

    <section class="catalog-section" aria-labelledby="catalogTitle">
      <div class="section-heading">
        <h2 id="catalogTitle">Parcours disponible</h2>
        ${state.search ? `<p>${courses.length} r&eacute;sultat${courses.length > 1 ? "s" : ""} pour "${escapeHtml(state.search)}"</p>` : ""}
      </div>
      ${courses.length ? renderCourseCards(courses) : renderEmptyCatalog()}
    </section>
  `;

  if (activeSearch) {
    const input = document.querySelector("#homeSearchInput");
    input?.focus({ preventScroll: true });
    input?.setSelectionRange(cursor, cursor);
  }
}

function renderCourseOverview(course) {
  els.breadcrumb.innerHTML = renderBreadcrumb([
    ["Formations", routeHref()],
    [course.title]
  ]);
  els.content.className = "content course-content";
  els.pager.innerHTML = "";

  els.content.innerHTML = `
    <section class="course-hero" aria-labelledby="courseTitle">
      <p class="eyebrow">Formation</p>
      <h1 id="courseTitle">${escapeHtml(course.title)}</h1>
      ${course.description ? `<p class="hero-copy">${escapeHtml(course.description)}</p>` : ""}
      <div class="course-actions">
        ${course.chapters[0] ? `<a class="button primary" href="${firstChapterHref(course)}">Commencer</a>` : ""}
        <a class="button ghost" href="${routeHref()}">Toutes les formations</a>
      </div>
    </section>

    <section class="chapter-section" aria-labelledby="chapterTitle">
      <div class="section-heading">
        <h2 id="chapterTitle">Plan du cours</h2>
        <p>${course.chapters.length} chapitre${course.chapters.length > 1 ? "s" : ""}</p>
      </div>
      <div class="chapter-grid">
        ${course.chapters.length ? course.chapters.map((chapter, index) => `
          <a class="chapter-card" href="${routeHref(course.id, chapter.id)}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(chapter.title)}</strong>
          </a>
        `).join("") : `<div class="nav-empty">Ce cours n'a pas encore de chapitre Markdown.</div>`}
      </div>
    </section>
  `;
}

function renderCourseCards(courses) {
  return `
    <div class="course-grid">
      ${courses.map((course) => `
        <article class="course-card">
          <div>
            <p class="course-meta">${course.chapters.length} chapitre${course.chapters.length > 1 ? "s" : ""}</p>
            <h3>${escapeHtml(course.title)}</h3>
            ${course.description ? `<p>${escapeHtml(course.description)}</p>` : ""}
          </div>
          ${renderChapterPreview(course)}
          <div class="card-actions">
            <a class="button primary" href="${firstChapterHref(course)}">Ouvrir</a>
            <a class="button ghost" href="${routeHref(course.id)}">Voir le plan</a>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderChapterPreview(course) {
  if (!course.chapters.length) {
    return `<p class="empty-note">Aucun chapitre pour le moment.</p>`;
  }

  const preview = course.chapters.slice(0, 3);
  const remaining = course.chapters.length - preview.length;

  return `
    <ul class="chapter-preview">
      ${preview.map((chapter) => `<li>${escapeHtml(chapter.title)}</li>`).join("")}
      ${remaining > 0 ? `<li>+ ${remaining} autre${remaining > 1 ? "s" : ""}</li>` : ""}
    </ul>
  `;
}

function renderEmptyCatalog() {
  return `
    <div class="empty-catalog">
      <h3>Aucune formation trouv&eacute;e</h3>
      <p>Essaie une autre recherche ou reviens au catalogue complet.</p>
      <a class="button ghost" href="${routeHref()}">Retour &agrave; l'accueil</a>
    </div>
  `;
}

function renderNotFound(courseId) {
  els.breadcrumb.innerHTML = renderBreadcrumb([["Formations", routeHref()], ["Cours introuvable"]]);
  els.content.className = "content course-content";
  els.pager.innerHTML = "";
  els.content.innerHTML = `
    <div class="error-box">
      <h1>Cours introuvable</h1>
      <p>Le cours <code>${escapeHtml(courseId)}</code> n'existe pas dans le manifest.</p>
      <a class="button primary" href="${routeHref()}">Retour aux formations</a>
    </div>
  `;
}

function parseMarkdown(markdown) {
  if (!window.marked) {
    return `<p>La librairie Markdown n'est pas chargee.</p>`;
  }

  const rawHtml = window.marked.parse(preprocessTosaBlocks(markdown), {
    breaks: false,
    gfm: true
  });

  if (window.DOMPurify) {
    return window.DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "data-kind", "data-config"]
    });
  }

  return rawHtml;
}

function preprocessTosaBlocks(markdown) {
  return markdown.replace(/```tosa-(quiz|code|match)\s*\n([\s\S]*?)```/g, (_match, kind, source) => {
    try {
      const config = JSON.parse(source);
      return `<div class="tosa-activity" data-kind="${kind}" data-config="${encodeActivityConfig(config)}"></div>`;
    } catch (error) {
      return `<div class="tosa-activity parse-error"><strong>Activit&eacute; TOSA invalide</strong><p>${escapeHtml(error.message)}</p></div>`;
    }
  });
}

function encodeActivityConfig(config) {
  const json = JSON.stringify(config);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeActivityConfig(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function initTosaActivities(container) {
  container.querySelectorAll(".tosa-activity[data-kind][data-config]").forEach((activity, index) => {
    let config;
    try {
      config = decodeActivityConfig(activity.dataset.config);
    } catch (error) {
      activity.innerHTML = `<strong>Activit&eacute; TOSA illisible</strong><p>${escapeHtml(error.message)}</p>`;
      return;
    }

    activity.dataset.activityId = `tosa-${index}`;

    if (activity.dataset.kind === "quiz") {
      renderTosaQuiz(activity, config);
    } else if (activity.dataset.kind === "code") {
      renderTosaCode(activity, config);
    } else if (activity.dataset.kind === "match") {
      renderTosaMatch(activity, config);
    }
  });
}

function renderTosaQuiz(activity, config) {
  const answers = normalizeAnswers(config.answers ?? config.answer);
  const multiple = config.mode === "multiple" || answers.length > 1;
  const inputType = multiple ? "checkbox" : "radio";
  const groupName = `${activity.dataset.activityId}-quiz`;

  activity.classList.add("is-quiz");
  activity.innerHTML = `
    <div class="tosa-head">
      <span>${multiple ? "QCM multi-r&eacute;ponses" : "QCM"}</span>
      ${config.level ? `<small>${escapeHtml(config.level)}</small>` : ""}
    </div>
    <fieldset>
      <legend>${escapeHtml(config.question)}</legend>
      <div class="tosa-options">
        ${(config.options ?? []).map((option, optionIndex) => `
          <label>
            <input type="${inputType}" name="${groupName}" value="${optionIndex}" />
            <span>${escapeHtml(option)}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
    <div class="tosa-actions">
      <button type="button" data-action="check">V&eacute;rifier</button>
      <button type="button" data-action="reset">R&eacute;initialiser</button>
      <button type="button" data-action="solution">Correction</button>
    </div>
    <p class="tosa-feedback" aria-live="polite"></p>
  `;

  activity.querySelector('[data-action="check"]').addEventListener("click", () => {
    const selected = Array.from(activity.querySelectorAll("input:checked")).map((input) => Number(input.value));
    const success = sameNumberSet(selected, answers);
    setActivityFeedback(activity, success, success ? "Correct." : "Pas encore. Compare toutes les propositions, surtout en multi-r&eacute;ponses.", config.explanation);
  });

  activity.querySelector('[data-action="reset"]').addEventListener("click", () => {
    activity.querySelectorAll("input").forEach((input) => {
      input.checked = false;
      input.closest("label").classList.remove("is-correct", "is-wrong", "is-missed");
    });
    clearActivityFeedback(activity);
  });

  activity.querySelector('[data-action="solution"]').addEventListener("click", () => {
    activity.querySelectorAll("input").forEach((input) => {
      const label = input.closest("label");
      const isAnswer = answers.includes(Number(input.value));
      label.classList.toggle("is-correct", isAnswer);
      label.classList.toggle("is-wrong", input.checked && !isAnswer);
      label.classList.toggle("is-missed", !input.checked && isAnswer);
      input.checked = isAnswer;
    });
    setActivityFeedback(activity, true, "Correction affich&eacute;e.", config.explanation);
  });
}

function renderTosaCode(activity, config) {
  const code = getActivityCode(config, "code");
  const solution = getActivityCode(config, "solution");

  activity.classList.add("is-code");
  activity.innerHTML = `
    <div class="tosa-head">
      <span>Code &agrave; corriger</span>
      ${config.level ? `<small>${escapeHtml(config.level)}</small>` : ""}
    </div>
    ${config.title ? `<h2>${escapeHtml(config.title)}</h2>` : ""}
    ${config.instructions ? `<p>${escapeHtml(config.instructions)}</p>` : ""}
    <label class="tosa-code-label">
      <span>Zone de r&eacute;ponse modifiable</span>
      <textarea spellcheck="false">${escapeHtml(code)}</textarea>
    </label>
    <div class="tosa-actions">
      <button type="button" data-action="check">V&eacute;rifier</button>
      <button type="button" data-action="reset">R&eacute;initialiser</button>
      ${solution ? `<button type="button" data-action="solution">Correction</button>` : ""}
    </div>
    <ul class="tosa-checks"></ul>
    <p class="tosa-feedback" aria-live="polite"></p>
  `;

  const textarea = activity.querySelector("textarea");

  activity.querySelector('[data-action="check"]').addEventListener("click", () => {
    const results = (config.checks ?? []).map((check) => evaluateCodeCheck(textarea.value, check));
    renderCodeCheckResults(activity, results);
    const success = results.length > 0 && results.every((result) => result.pass);
    setActivityFeedback(activity, success, success ? "Le code respecte les points attendus." : "Il reste au moins un point &agrave; corriger.", config.explanation);
  });

  activity.querySelector('[data-action="reset"]').addEventListener("click", () => {
    textarea.value = code;
    activity.querySelector(".tosa-checks").innerHTML = "";
    clearActivityFeedback(activity);
  });

  activity.querySelector('[data-action="solution"]')?.addEventListener("click", () => {
    textarea.value = solution;
    activity.querySelector('[data-action="check"]').click();
  });
}

function renderTosaMatch(activity, config) {
  const choices = config.choices ?? [];

  activity.classList.add("is-match");
  activity.innerHTML = `
    <div class="tosa-head">
      <span>Association</span>
      ${config.level ? `<small>${escapeHtml(config.level)}</small>` : ""}
    </div>
    ${config.prompt ? `<h2>${escapeHtml(config.prompt)}</h2>` : ""}
    <div class="tosa-match-list">
      ${(config.items ?? []).map((item, itemIndex) => `
        <label>
          <span>${escapeHtml(item.label)}</span>
          <select data-answer="${escapeHtml(item.answer)}" aria-label="R&eacute;ponse pour ${escapeHtml(item.label)}">
            <option value="">Choisir...</option>
            ${choices.map((choice) => `<option value="${escapeHtml(choice)}">${escapeHtml(choice)}</option>`).join("")}
          </select>
        </label>
      `).join("")}
    </div>
    <div class="tosa-actions">
      <button type="button" data-action="check">V&eacute;rifier</button>
      <button type="button" data-action="reset">R&eacute;initialiser</button>
      <button type="button" data-action="solution">Correction</button>
    </div>
    <p class="tosa-feedback" aria-live="polite"></p>
  `;

  activity.querySelector('[data-action="check"]').addEventListener("click", () => {
    const selects = Array.from(activity.querySelectorAll("select"));
    const success = selects.every((select) => select.value === select.dataset.answer);
    selects.forEach((select) => {
      const isCorrect = select.value === select.dataset.answer;
      select.closest("label").classList.toggle("is-correct", isCorrect);
      select.closest("label").classList.toggle("is-wrong", !isCorrect);
    });
    setActivityFeedback(activity, success, success ? "Toutes les associations sont correctes." : "Certaines associations sont &agrave; revoir.", config.explanation);
  });

  activity.querySelector('[data-action="reset"]').addEventListener("click", () => {
    activity.querySelectorAll("select").forEach((select) => {
      select.value = "";
      select.closest("label").classList.remove("is-correct", "is-wrong");
    });
    clearActivityFeedback(activity);
  });

  activity.querySelector('[data-action="solution"]').addEventListener("click", () => {
    activity.querySelectorAll("select").forEach((select) => {
      select.value = select.dataset.answer;
      select.closest("label").classList.add("is-correct");
      select.closest("label").classList.remove("is-wrong");
    });
    setActivityFeedback(activity, true, "Correction affich&eacute;e.", config.explanation);
  });
}

function normalizeAnswers(value) {
  const answers = Array.isArray(value) ? value : [value];
  return answers.map(Number).filter((answer) => Number.isInteger(answer));
}

function sameNumberSet(left, right) {
  if (left.length !== right.length) return false;
  const sortedLeft = [...left].sort((a, b) => a - b);
  const sortedRight = [...right].sort((a, b) => a - b);
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

function getActivityCode(config, key) {
  if (Array.isArray(config[`${key}Lines`])) return config[`${key}Lines`].join("\n");
  return config[key] ?? "";
}

function evaluateCodeCheck(code, check) {
  const contains = Array.isArray(check.contains) ? check.contains : check.contains ? [check.contains] : [];
  const absent = Array.isArray(check.absent) ? check.absent : check.absent ? [check.absent] : [];
  const containsOk = contains.every((needle) => code.includes(needle));
  const absentOk = absent.every((needle) => !code.includes(needle));
  const regexOk = check.regex ? new RegExp(check.regex, check.flags ?? "i").test(code) : true;

  return {
    label: check.label,
    pass: containsOk && absentOk && regexOk
  };
}

function renderCodeCheckResults(activity, results) {
  activity.querySelector(".tosa-checks").innerHTML = results
    .map((result) => `<li class="${result.pass ? "is-correct" : "is-wrong"}">${escapeHtml(result.label)}</li>`)
    .join("");
}

function setActivityFeedback(activity, success, message, explanation = "") {
  const feedback = activity.querySelector(".tosa-feedback");
  feedback.className = `tosa-feedback ${success ? "is-success" : "is-error"}`;
  feedback.innerHTML = `${escapeHtml(message)}${explanation ? `<span>${escapeHtml(explanation)}</span>` : ""}`;
}

function clearActivityFeedback(activity) {
  const feedback = activity.querySelector(".tosa-feedback");
  feedback.className = "tosa-feedback";
  feedback.textContent = "";
}

function renderPager(course, chapterIndex) {
  if (!course || chapterIndex < 0) {
    els.pager.innerHTML = "";
    return;
  }

  const previous = course.chapters[chapterIndex - 1];
  const next = course.chapters[chapterIndex + 1];

  els.pager.innerHTML = `
    <div>
      ${
        previous
          ? `<a href="${routeHref(course.id, previous.id)}"><span class="pager-label">Pr&eacute;c&eacute;dent</span>${escapeHtml(previous.title)}</a>`
          : ""
      }
    </div>
    <div>
      ${
        next
          ? `<a class="next" href="${routeHref(course.id, next.id)}"><span class="pager-label">Suivant</span>${escapeHtml(next.title)}</a>`
          : ""
      }
    </div>
  `;
}

function renderBreadcrumb(items) {
  return items
    .map(([label, url], index) => {
      const content = url
        ? `<a href="${url}">${escapeHtml(label)}</a>`
        : `<span>${escapeHtml(label)}</span>`;
      const separator = index < items.length - 1 ? `<span aria-hidden="true">/</span>` : "";
      return `${content}${separator}`;
    })
    .join("");
}

function fixRelativeUrls(container, course, chapter) {
  const baseDir = chapter.file.split("/").slice(0, -1).join("/");

  container.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (isRelativeUrl(src)) {
      img.setAttribute("src", `${baseDir}/${src}`);
    }
  });

  container.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (href.endsWith(".md") && isRelativeUrl(href)) {
      const fileName = href.split("/").pop();
      const chapterId = fileName.replace(/\.md$/i, "");
      const targetChapter = course.chapters.find((item) => item.id === chapterId);
      if (targetChapter) {
        link.setAttribute("href", routeHref(course.id, targetChapter.id));
        return;
      }
    }

    if (isRelativeUrl(href)) {
      link.setAttribute("href", `${baseDir}/${href}`);
    }

    if (link.hostname && link.hostname !== window.location.hostname) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}

function addHeadingAnchors(container) {
  container.querySelectorAll("h2, h3, h4").forEach((heading) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent);
    }
  });
}

function isRelativeUrl(url) {
  if (!url) return false;
  return !/^(https?:|mailto:|tel:|data:|#|\/)/i.test(url);
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function render() {
  const { route, course, chapter, chapterIndex } = findCurrent();
  const nextRouteKey = routeKey(route);
  const shouldScrollTop = state.routeKey !== null && state.routeKey !== nextRouteKey;

  renderCourses();
  renderChapters(course, chapter?.id);
  await renderContent(course, chapter, route);
  renderPager(course, chapterIndex);
  state.routeKey = nextRouteKey;

  if (shouldScrollTop) {
    scrollToTop();
  }
}

async function init() {
  state.manifest = await loadManifest();
  els.content.addEventListener("input", (event) => {
    if (event.target?.id !== "homeSearchInput") return;
    state.search = event.target.value;
    renderHome();
  });
  els.navToggle.addEventListener("click", () => {
    setNavOpen(!state.navOpen);
  });
  els.navOverlay.addEventListener("click", () => {
    setNavOpen(false);
  });
  els.sidebar.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    if (window.matchMedia("(max-width: 860px)").matches) {
      setNavOpen(false);
    }
  });
  window.addEventListener("resize", syncNavState);
  window.addEventListener("hashchange", render);
  await render();
}

function setNavOpen(isOpen) {
  state.navOpen = isOpen;
  syncNavState();
}

function syncNavState() {
  const isHome = document.body.classList.contains("is-home");
  const isOpen = state.navOpen && !isHome;

  document.body.classList.toggle("nav-open", isOpen);
  document.body.classList.toggle("nav-closed", !isOpen && !isHome);
  els.navToggle.setAttribute("aria-expanded", String(isOpen));
  els.navToggle.setAttribute("aria-label", isOpen ? "Fermer la navigation du cours" : "Ouvrir la navigation du cours");
  els.navOverlay.hidden = !(isOpen && window.matchMedia("(max-width: 860px)").matches);
}

function scrollToTop() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });
}

init().catch((error) => {
  console.error(error);
  els.content.className = "content course-content";
  els.content.innerHTML = `
    <div class="error-box">
      <h1>Erreur</h1>
      <p>${escapeHtml(error.message)}</p>
    </div>
  `;
});
