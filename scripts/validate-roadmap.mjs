import { readFile } from "node:fs/promises";

const domains = [
  ["html", 7],
  ["css", 8],
  ["javascript", 10],
  ["dom", 5],
  ["integration", 5]
];
const levelQuotas = { 1: 5, 2: 7, 3: 10, 4: 8, 5: 5 };
const requiredAppSnippets = [
  "#/exam",
  "EXAM_DURATION_SECONDS = 90 * 60",
  "EXAM_TOTAL_QUESTIONS = 35",
  "examStartedAt",
  "examEndsAt",
  "examAnswers",
  "examQuestionIds",
  "examCurrentQuestionIndex",
  "renderExamResult",
  "renderPracticeRoute",
  "renderCompetencyRadar",
  "renderExamHistoryPage",
  "calculateEstimatedTosaScore",
  "probabilityCorrect",
  "calculateBalancePenalty",
  "evaluateCodeExercise",
  "runCodeTest",
  "iframe.sandbox = \"allow-scripts\""
];
const forbiddenAppSnippets = [
  "downloadExamReport",
  "window.print",
  "data-exam-action=\"download\"",
  "data-exam-action=\"print\"",
  "createObjectURL",
  "link.download"
];

const bank = [];
for (const [domain] of domains) {
  const questions = JSON.parse(await readFile(`data/questions/${domain}.json`, "utf8"));
  bank.push(...questions);
}

const ids = new Set();
for (const question of bank) {
  for (const field of ["id", "domain", "topic", "level", "type", "question", "explanation", "references"]) {
    if (question[field] === undefined || question[field] === null || question[field] === "") {
      throw new Error(`Question ${question.id ?? "(sans id)"}: champ manquant ${field}`);
    }
  }
  if (ids.has(question.id)) {
    throw new Error(`ID de question duplique: ${question.id}`);
  }
  ids.add(question.id);
  validateQuestionShape(question);
}

const fallbackExam = domains.flatMap(([domain, quota]) =>
  bank.filter((question) => question.domain === domain).slice(0, quota)
);
if (fallbackExam.length !== 35) {
  throw new Error(`L'examen de reference contient ${fallbackExam.length} questions au lieu de 35.`);
}

const fallbackDomains = Object.fromEntries(domains.map(([domain]) => [
  domain,
  fallbackExam.filter((question) => question.domain === domain).length
]));
for (const [domain, quota] of domains) {
  if (fallbackDomains[domain] !== quota) {
    throw new Error(`Quota domaine incorrect pour ${domain}: ${fallbackDomains[domain]} au lieu de ${quota}.`);
  }
}

const fallbackLevels = fallbackExam.reduce((counts, question) => {
  counts[question.level] = (counts[question.level] ?? 0) + 1;
  return counts;
}, {});
for (const [level, quota] of Object.entries(levelQuotas)) {
  if (fallbackLevels[level] !== quota) {
    throw new Error(`Quota niveau incorrect pour ${level}: ${fallbackLevels[level]} au lieu de ${quota}.`);
  }
}

const generatedSignatures = new Set();
for (let attempt = 0; attempt < 20; attempt += 1) {
  const exam = generateRandomExam(bank);
  if (!exam || exam.length !== 35) {
    throw new Error(`Generation aleatoire invalide a l'essai ${attempt + 1}.`);
  }
  validateExamQuotas(exam);
  generatedSignatures.add(exam.map((question) => question.id).sort().join("|"));
}
if (generatedSignatures.size < 2 && bank.length > 35) {
  throw new Error("La generation d'examen semble figee malgre une banque de plus de 35 questions.");
}

const app = await readFile("app.js", "utf8");
for (const snippet of requiredAppSnippets) {
  if (!app.includes(snippet)) {
    throw new Error(`Feature attendue absente de app.js: ${snippet}`);
  }
}
for (const snippet of forbiddenAppSnippets) {
  if (app.includes(snippet)) {
    throw new Error(`Fonction d'export hors perimetre detectee dans app.js: ${snippet}`);
  }
}

const css = await readFile("style.css", "utf8");
if (css.includes("@media print")) {
  throw new Error("CSS d'impression hors perimetre detecte dans style.css.");
}

const workflow = await readFile(".github/workflows/pages.yml", "utf8");
if (!workflow.includes("cp -r data _site/")) {
  throw new Error("Le workflow GitHub Pages doit deployer le dossier data/ pour l'examen.");
}
if (!workflow.includes("cp -r courses _site/")) {
  throw new Error("Le workflow GitHub Pages doit deployer le dossier courses/.");
}

const indexHtml = await readFile("index.html", "utf8");
if (!indexHtml.includes("style.css?v=") || !indexHtml.includes("app.js?v=")) {
  throw new Error("index.html doit cache-buster style.css et app.js apres les changements applicatifs.");
}

const manifest = JSON.parse(await readFile("manifest.json", "utf8"));
if (!Array.isArray(manifest.courses) || manifest.courses.length === 0) {
  throw new Error("Le manifest ne contient aucun parcours actif.");
}
manifest.courses.forEach((course) => {
  if (!Array.isArray(course.chapters) || course.chapters.length === 0) {
    throw new Error(`Le parcours ${course.id} ne contient aucun chapitre actif.`);
  }
  course.chapters.forEach((chapter) => {
    if (chapter.file.includes("/_archive/")) {
      throw new Error(`Chapitre archive present dans le manifest: ${chapter.file}`);
    }
  });
});

console.log(`Roadmap OK: ${bank.length} questions, ${ids.size} IDs uniques, examen 35 questions aleatoire valide.`);

function generateRandomExam(questionBank) {
  const domainRemaining = Object.fromEntries(domains.map(([domain, quota]) => [domain, quota]));
  const levelRemaining = { ...levelQuotas };
  const pools = buildPools(questionBank);
  return pickQuestions(pools, domainRemaining, levelRemaining, new Set(), []);
}

function buildPools(questionBank) {
  const pools = new Map();
  questionBank.forEach((question) => {
    const key = `${question.domain}:${question.level}`;
    pools.set(key, [...(pools.get(key) ?? []), question]);
  });
  pools.forEach((questions, key) => {
    pools.set(key, shuffle(questions));
  });
  return pools;
}

function pickQuestions(pools, domainRemaining, levelRemaining, usedIds, selected) {
  if (selected.length === 35) {
    return quotasComplete(domainRemaining, levelRemaining) ? selected : null;
  }
  if (!quotasFeasible(pools, domainRemaining, levelRemaining, usedIds)) return null;

  const slot = getMostConstrainedSlot(pools, domainRemaining, levelRemaining, usedIds);
  if (!slot) return null;

  for (const question of slot.candidates) {
    usedIds.add(question.id);
    domainRemaining[question.domain] -= 1;
    levelRemaining[question.level] -= 1;
    const result = pickQuestions(pools, domainRemaining, levelRemaining, usedIds, [...selected, question]);
    if (result) return result;
    levelRemaining[question.level] += 1;
    domainRemaining[question.domain] += 1;
    usedIds.delete(question.id);
  }
  return null;
}

function getMostConstrainedSlot(pools, domainRemaining, levelRemaining, usedIds) {
  const slots = [];
  domains.forEach(([domain]) => {
    if (domainRemaining[domain] <= 0) return;
    Object.keys(levelQuotas).forEach((level) => {
      if (levelRemaining[level] <= 0) return;
      const candidates = getCandidates(pools, domain, Number(level), usedIds);
      if (candidates.length > 0) slots.push({ candidates });
    });
  });
  return slots.sort((left, right) => left.candidates.length - right.candidates.length)[0] ?? null;
}

function quotasFeasible(pools, domainRemaining, levelRemaining, usedIds) {
  const domainsOk = domains.every(([domain]) => {
    const available = Object.keys(levelQuotas).reduce((sum, level) => (
      levelRemaining[level] > 0 ? sum + getCandidates(pools, domain, Number(level), usedIds).length : sum
    ), 0);
    return available >= domainRemaining[domain];
  });
  const levelsOk = Object.keys(levelQuotas).every((level) => {
    const available = domains.reduce((sum, [domain]) => (
      domainRemaining[domain] > 0 ? sum + getCandidates(pools, domain, Number(level), usedIds).length : sum
    ), 0);
    return available >= levelRemaining[level];
  });
  return domainsOk && levelsOk;
}

function getCandidates(pools, domain, level, usedIds) {
  return (pools.get(`${domain}:${level}`) ?? []).filter((question) => !usedIds.has(question.id));
}

function quotasComplete(domainRemaining, levelRemaining) {
  return Object.values(domainRemaining).every((count) => count === 0)
    && Object.values(levelRemaining).every((count) => count === 0);
}

function validateExamQuotas(exam) {
  domains.forEach(([domain, quota]) => {
    const total = exam.filter((question) => question.domain === domain).length;
    if (total !== quota) throw new Error(`Quota domaine aleatoire incorrect pour ${domain}: ${total}`);
  });
  Object.entries(levelQuotas).forEach(([level, quota]) => {
    const total = exam.filter((question) => question.level === Number(level)).length;
    if (total !== quota) throw new Error(`Quota niveau aleatoire incorrect pour ${level}: ${total}`);
  });
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function validateQuestionShape(question) {
  if (!Number.isInteger(question.level) || question.level < 1 || question.level > 5) {
    throw new Error(`Question ${question.id}: niveau invalide.`);
  }

  if (question.difficulty !== undefined && typeof question.difficulty !== "number") {
    throw new Error(`Question ${question.id}: difficulty doit etre un nombre.`);
  }
  if (question.guessing !== undefined && (typeof question.guessing !== "number" || question.guessing < 0 || question.guessing >= 1)) {
    throw new Error(`Question ${question.id}: guessing doit etre entre 0 inclus et 1 exclu.`);
  }
  if (question.discrimination !== undefined && (typeof question.discrimination !== "number" || question.discrimination <= 0)) {
    throw new Error(`Question ${question.id}: discrimination doit etre positive.`);
  }

  if (["single", "multiple", "code-output"].includes(question.type)) {
    validateOptionsAndAnswers(question);
  } else if (question.type === "match") {
    if (!Array.isArray(question.items) || question.items.length === 0 || !Array.isArray(question.choices) || question.choices.length === 0) {
      throw new Error(`Question ${question.id}: match doit avoir items et choices.`);
    }
    question.items.forEach((item) => {
      if (!item.prompt || !item.answer || !question.choices.includes(item.answer)) {
        throw new Error(`Question ${question.id}: item match invalide.`);
      }
    });
  } else if (question.type === "order") {
    validateOptionsAndAnswers(question);
    if (question.answers.length !== question.options.length) {
      throw new Error(`Question ${question.id}: order doit ordonner toutes les options.`);
    }
  } else if (question.type === "code-fix") {
    if (!question.code || !question.solution || !Array.isArray(question.checks) || question.checks.length === 0) {
      throw new Error(`Question ${question.id}: code-fix doit avoir code, solution et checks.`);
    }
    question.checks.forEach((check) => {
      if (!check.label || (!check.contains && !check.absent && !check.regex)) {
        throw new Error(`Question ${question.id}: check code-fix invalide.`);
      }
    });
    if (question.tests === undefined) {
      throw new Error(`Question ${question.id}: code-fix doit avoir des tests executables.`);
    }
    validateCodeTests(question);
  } else {
    throw new Error(`Question ${question.id}: type inconnu ${question.type}.`);
  }
}

function validateCodeTests(question) {
  if (!Array.isArray(question.tests) || question.tests.length === 0) {
    throw new Error(`Question ${question.id}: tests doit etre un tableau non vide.`);
  }

  question.tests.forEach((test) => {
    if (!test.type || !["console", "dom", "html", "css", "page"].includes(test.type)) {
      throw new Error(`Question ${question.id}: type de test executable invalide.`);
    }
    if (test.type === "page" && !["html-css", "html-js"].includes(test.mode)) {
      throw new Error(`Question ${question.id}: test page doit avoir un mode html-css ou html-js.`);
    }
    ["before", "after"].forEach((field) => {
      if (test[field] !== undefined && typeof test[field] !== "string") {
        throw new Error(`Question ${question.id}: ${field} doit etre une chaine.`);
      }
    });
    if (test.type === "console" && (!Array.isArray(test.expectedLogs) || test.expectedLogs.some((log) => typeof log !== "string"))) {
      throw new Error(`Question ${question.id}: test console doit avoir expectedLogs en chaines.`);
    }
    if (["dom", "html", "css", "page"].includes(test.type)) {
      if ((test.type === "dom" || test.type === "css") && typeof test.fixture !== "string") {
        throw new Error(`Question ${question.id}: test ${test.type} doit avoir fixture.`);
      }
      if (!Array.isArray(test.assertions) || test.assertions.length === 0) {
        throw new Error(`Question ${question.id}: test ${test.type} doit avoir des assertions.`);
      }
      test.assertions.forEach((assertion) => {
        if (!assertion.selector || (!("equals" in assertion) && !("contains" in assertion) && !("matches" in assertion))) {
          throw new Error(`Question ${question.id}: assertion ${test.type} invalide.`);
        }
      });
    }
  });
}

function validateOptionsAndAnswers(question) {
  if (!Array.isArray(question.options) || question.options.length < 2) {
    throw new Error(`Question ${question.id}: options manquantes.`);
  }
  if (!Array.isArray(question.answers) || question.answers.length === 0) {
    throw new Error(`Question ${question.id}: answers manquantes.`);
  }
  question.answers.forEach((answer) => {
    if (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length) {
      throw new Error(`Question ${question.id}: index de reponse invalide.`);
    }
  });
}
