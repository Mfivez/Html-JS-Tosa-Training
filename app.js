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

const EXAM_DURATION_SECONDS = 90 * 60;
const EXAM_TOTAL_QUESTIONS = 35;
const EXAM_STORAGE_KEYS = {
  startedAt: "examStartedAt",
  endsAt: "examEndsAt",
  answers: "examAnswers",
  questionIds: "examQuestionIds",
  currentQuestionIndex: "examCurrentQuestionIndex",
  targetLevel: "examTargetLevel",
  optionOrders: "examOptionOrders",
  result: "examResult",
  history: "examHistory",
  practiceMistakes: "practiceMistakes"
};
const EXAM_DOMAINS = [
  { id: "html", label: "HTML", quota: 7, file: "data/questions/html.json" },
  { id: "css", label: "CSS", quota: 8, file: "data/questions/css.json" },
  { id: "javascript", label: "JavaScript", quota: 10, file: "data/questions/javascript.json" },
  { id: "dom", label: "DOM / Events", quota: 5, file: "data/questions/dom.json" },
  { id: "integration", label: "Integration", quota: 5, file: "data/questions/integration.json" }
];
const EXAM_LEVEL_QUOTAS = { 1: 5, 2: 7, 3: 10, 4: 8, 5: 5 };
const DEFAULT_DIFFICULTY_BY_LEVEL = { 1: -2, 2: -1, 3: 0, 4: 1, 5: 2 };
const DEFAULT_GUESSING_BY_TYPE = {
  single: 0.25,
  multiple: 0.15,
  "code-output": 0.1,
  "code-fix": 0.05,
  match: 0.1,
  order: 0.1
};
const DEFAULT_DISCRIMINATION_BY_TYPE = {
  single: 1,
  multiple: 1.2,
  "code-output": 1.4,
  "code-fix": 1.6,
  match: 1.1,
  order: 1.2
};

const state = {
  manifest: null,
  search: "",
  navOpen: window.matchMedia("(min-width: 861px)").matches,
  routeKey: null,
  questionBank: null,
  examTimerId: null,
  practiceFilters: {
    domain: "",
    level: "",
    type: "",
    mistakesOnly: false
  }
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

  if (parts[0] === "exam") {
    return {
      isExam: true,
      examPage: ["result", "history"].includes(parts[1]) ? parts[1] : "run",
      courseId: null,
      chapterId: null
    };
  }

  if (parts[0] === "practice") {
    return {
      isPractice: true,
      practiceMode: ["quick", "topic", "domain"].includes(parts[1]) ? parts[1] : "all",
      practiceTarget: parts[2] ?? null,
      courseId: null,
      chapterId: null
    };
  }

  return {
    isExam: false,
    isPractice: false,
    examPage: null,
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
  if (route.isExam) return `exam/${route.examPage}`;
  if (route.isPractice) return `practice/${route.practiceMode}/${route.practiceTarget ?? ""}`;
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
  if (route.isExam || route.isPractice) {
    return { route, course: null, chapter: null, chapterIndex: -1 };
  }

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
  const isHome = !route.courseId && !route.isExam && !route.isPractice;
  document.body.classList.toggle("is-home", isHome);
  els.main.classList.toggle("is-home", isHome);
  els.sidebarSubtitle.textContent = route.isExam
    ? "Examen blanc TOSA"
    : route.isPractice
      ? "Entrainement libre"
      : course?.title ?? "Navigation du cours";
  syncNavState();

  if (route.isExam) {
    await renderExamRoute(route);
    return;
  }

  if (route.isPractice) {
    await renderPracticeRoute(route.practiceMode, route.practiceTarget);
    return;
  }

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
  if (chapter.id === "06_mini_examen_mixte") {
    initExamRotation(els.content);
  }
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
      <div class="course-actions">
        <a class="button primary" href="#/exam">Examen blanc TOSA</a>
        <a class="button ghost" href="#/practice">Entrainement libre</a>
      </div>
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

function initExamRotation(container) {
  const STORAGE_KEY = "tosa-exam-rotation";
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const types = ["quiz", "code", "match"];

  types.forEach((type) => {
    const activities = Array.from(container.querySelectorAll(`.tosa-activity[data-kind="${type}"]`));
    if (activities.length <= 1) return;

    const prevIndex = stored[type] ?? -1;
    const nextIndex = (prevIndex + 1) % activities.length;
    stored[type] = nextIndex;

    activities.forEach((act, i) => {
      act.hidden = i !== nextIndex;
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));

  const serieNums = types.map((t) => (stored[t] ?? 0) + 1);
  const banner = document.createElement("p");
  banner.className = "exam-rotation-banner";
  banner.textContent = `Série ${serieNums[0]} / ${Array.from(container.querySelectorAll('.tosa-activity[data-kind="quiz"]')).length}`;
  container.insertBefore(banner, container.firstChild);
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
      label.classList.remove("is-missed");
      input.checked = isAnswer;
    });
    setActivityFeedback(activity, null, "Correction affich&eacute;e.", config.explanation);
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

  activity.querySelector('[data-action="check"]').addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Test...";
    const results = await evaluateCodeExercise(textarea.value, config);
    renderCodeCheckResults(activity, results);
    const success = results.length > 0 && results.every((result) => result.pass);
    setActivityFeedback(activity, success, success ? "Le code respecte les points attendus." : "Il reste au moins un point &agrave; corriger.", config.explanation);
    button.disabled = false;
    button.textContent = "Verifier";
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
    setActivityFeedback(activity, null, "Correction affich&eacute;e.", config.explanation);
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

async function evaluateCodeExercise(code, config) {
  const tests = Array.isArray(config.tests) ? config.tests : [];
  if (tests.length > 0) {
    return runCodeTests(code, tests);
  }

  return (config.checks ?? []).map((check) => evaluateCodeCheck(code, check));
}

async function runCodeTests(code, tests) {
  const results = [];
  for (const test of tests) {
    results.push(await runCodeTest(code, test));
  }
  return results;
}

function runCodeTest(code, test) {
  return new Promise((resolve) => {
    const runId = `code-test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    let settled = false;

    iframe.sandbox = "allow-scripts";
    iframe.style.display = "none";

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      iframe.remove();
    };

    const finish = (result) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const timeout = window.setTimeout(() => {
      finish({
        label: test.label ?? getCodeTestLabel(test),
        pass: false,
        details: "Temps limite depasse."
      });
    }, test.timeout ?? 1000);

    function onMessage(event) {
      if (event.source !== iframe.contentWindow) return;
      if (event.data?.source !== "tosa-code-runner" || event.data.runId !== runId) return;
      window.clearTimeout(timeout);
      finish(event.data.result);
    }

    window.addEventListener("message", onMessage);
    document.body.appendChild(iframe);

    iframe.srcdoc = `
      <!doctype html>
      <meta charset="utf-8">
      <script>
        (async () => {
          const runId = ${serializeForScript(runId)};
          const userCode = ${serializeForScript(code)};
          const test = ${serializeForScript(test)};
          const logs = [];
          const stringify = (value) => {
            if (typeof value === "string") return value;
            try {
              return JSON.stringify(value);
            } catch (_error) {
              return String(value);
            }
          };
          console.log = (...args) => logs.push(args.map(stringify).join(" "));

          const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          const readValue = (element, assertion) => {
            if (!element) return "";
            if (assertion.count) return String(document.querySelectorAll(assertion.selector).length);
            if (assertion.computed) return getComputedStyle(element).getPropertyValue(assertion.computed);
            if (assertion.attribute) return element.getAttribute(assertion.attribute) ?? "";
            return String(element[assertion.property || "textContent"] ?? "");
          };
          const compare = (actual, assertion) => {
            if (assertion.equals !== undefined) return actual === String(assertion.equals);
            if (assertion.contains !== undefined) return actual.includes(String(assertion.contains));
            if (assertion.matches !== undefined) return new RegExp(assertion.matches, assertion.flags || "").test(actual);
            return false;
          };

          try {
            document.body.innerHTML = test.fixture || "";
            if (test.type === "html") {
              document.body.innerHTML = userCode;
            } else if (test.type === "css") {
              const style = document.createElement("style");
              style.textContent = userCode;
              document.head.appendChild(style);
            } else {
              const returned = new Function(userCode)();
              if (returned && typeof returned.then === "function") await returned;
            }

            for (const action of test.actions || []) {
              if (action.click) {
                document.querySelector(action.click)?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
              }
              if (action.input) {
                const target = document.querySelector(action.input);
                if (target) {
                  target.value = action.value ?? "";
                  target.dispatchEvent(new Event("input", { bubbles: true }));
                }
              }
              if (action.wait) await wait(action.wait);
            }

            const checks = [];
            if (test.type === "console") {
              const expected = test.expectedLogs || [];
              checks.push({
                pass: JSON.stringify(logs) === JSON.stringify(expected),
                details: "Attendu: " + expected.join(", ") + " | Obtenu: " + logs.join(", ")
              });
            } else if (["dom", "html", "css"].includes(test.type)) {
              for (const assertion of test.assertions || []) {
                const element = document.querySelector(assertion.selector);
                const actual = readValue(element, assertion);
                checks.push({
                  pass: Boolean(element) && compare(actual, assertion),
                  details: (assertion.selector || "element") + " -> " + actual
                });
              }
            } else {
              checks.push({ pass: false, details: "Type de test inconnu: " + test.type });
            }

            parent.postMessage({
              source: "tosa-code-runner",
              runId,
              result: {
                label: test.label || (${serializeForScript(getCodeTestLabel(test))}),
                pass: checks.length > 0 && checks.every((check) => check.pass),
                details: checks.map((check) => check.details).join(" ; ")
              }
            }, "*");
          } catch (error) {
            parent.postMessage({
              source: "tosa-code-runner",
              runId,
              result: {
                label: test.label || (${serializeForScript(getCodeTestLabel(test))}),
                pass: false,
                details: error.message
              }
            }, "*");
          }
        })();
      <\/script>
    `;
  });
}

function getCodeTestLabel(test) {
  if (test.type === "console") return "Sortie console attendue.";
  if (test.type === "dom") return "Comportement DOM attendu.";
  if (test.type === "html") return "Structure HTML attendue.";
  if (test.type === "css") return "Rendu CSS attendu.";
  return "Test executable.";
}

function serializeForScript(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function renderCodeCheckResults(activity, results) {
  activity.querySelector(".tosa-checks").innerHTML = results
    .map((result) => `
      <li class="${result.pass ? "is-correct" : "is-wrong"}">
        ${escapeHtml(result.label)}
        ${result.details ? `<span>${escapeHtml(result.details)}</span>` : ""}
      </li>
    `)
    .join("");
}

function setActivityFeedback(activity, success, message, explanation = "") {
  const feedback = activity.querySelector(".tosa-feedback");
  const cls = success === null ? "is-info" : success ? "is-success" : "is-error";
  feedback.className = `tosa-feedback ${cls}`;
  feedback.innerHTML = `${escapeHtml(message)}${explanation ? `<span>${escapeHtml(explanation)}</span>` : ""}`;
}

function clearActivityFeedback(activity) {
  const feedback = activity.querySelector(".tosa-feedback");
  feedback.className = "tosa-feedback";
  feedback.textContent = "";
}

async function renderExamRoute(route) {
  clearExamTimer();
  els.breadcrumb.innerHTML = renderBreadcrumb([
    ["Formations", routeHref()],
    [route.examPage === "result" ? "Resultat examen blanc" : route.examPage === "history" ? "Historique examens" : "Examen blanc TOSA"]
  ]);
  els.content.className = "content exam-content";
  els.pager.innerHTML = "";

  if (route.examPage === "history") {
    renderExamHistoryPage();
    return;
  }

  if (route.examPage === "result") {
    await renderExamResult();
    return;
  }

  const session = await getExamSession();
  if (!session) {
    renderExamStart();
    return;
  }

  if (getRemainingSeconds(session) <= 0) {
    submitExam("time");
    return;
  }

  renderExamQuestion(session);
}

function renderExamStart() {
  els.content.innerHTML = `
    <section class="exam-start" aria-labelledby="examTitle">
      <p class="eyebrow">Simulation non officielle</p>
      <h1 id="examTitle">Examen blanc TOSA Web</h1>
      <p class="hero-copy">35 questions, 90 minutes, score estime sur 1000. Les corrections restent masquees jusqu'a la soumission.</p>
      <div class="exam-facts" aria-label="Parametres de l'examen">
        <span>35 questions</span>
        <span>90 minutes</span>
        <span>Score /1000 estime</span>
      </div>
      <p class="exam-note">Cet examen blanc simule le format TOSA, mais ne reproduit pas l'algorithme officiel de scoring.</p>
      <div class="course-actions">
        <button class="button primary" type="button" data-exam-action="start">Commencer l'examen</button>
        ${hasStoredExamResult() ? `<a class="button ghost" href="#/exam/result">Voir le dernier resultat</a>` : ""}
        ${hasExamHistory() ? `<a class="button ghost" href="#/exam/history">Historique complet</a>` : ""}
      </div>
      ${renderExamHistoryPreview()}
    </section>
  `;

  els.content.querySelector('[data-exam-action="start"]').addEventListener("click", startExam);
}

async function startExam() {
  const bank = await loadQuestionBank();
  const questions = composeExamQuestions(bank);
  const now = Date.now();

  localStorage.setItem(EXAM_STORAGE_KEYS.startedAt, String(now));
  localStorage.setItem(EXAM_STORAGE_KEYS.endsAt, String(now + EXAM_DURATION_SECONDS * 1000));
  localStorage.setItem(EXAM_STORAGE_KEYS.answers, JSON.stringify({}));
  localStorage.setItem(EXAM_STORAGE_KEYS.questionIds, JSON.stringify(questions.map((question) => question.id)));
  localStorage.setItem(EXAM_STORAGE_KEYS.currentQuestionIndex, "0");
  localStorage.setItem(EXAM_STORAGE_KEYS.targetLevel, "3");
  localStorage.setItem(EXAM_STORAGE_KEYS.optionOrders, JSON.stringify(createOptionOrders(questions)));
  localStorage.removeItem(EXAM_STORAGE_KEYS.result);

  await render();
}

async function getExamSession() {
  const startedAt = Number(localStorage.getItem(EXAM_STORAGE_KEYS.startedAt));
  const endsAt = Number(localStorage.getItem(EXAM_STORAGE_KEYS.endsAt));
  const questionIds = readJson(EXAM_STORAGE_KEYS.questionIds, []);

  if (!startedAt || !endsAt || !Array.isArray(questionIds) || questionIds.length !== EXAM_TOTAL_QUESTIONS) {
    return null;
  }

  const bank = await loadQuestionBank();
  const byId = new Map(bank.map((question) => [question.id, question]));
  const questions = questionIds.map((id) => byId.get(id)).filter(Boolean);

  if (questions.length !== EXAM_TOTAL_QUESTIONS) {
    clearActiveExam();
    return null;
  }

  return {
    startedAt,
    endsAt,
    questions,
    answers: readJson(EXAM_STORAGE_KEYS.answers, {}),
    currentQuestionIndex: clampIndex(Number(localStorage.getItem(EXAM_STORAGE_KEYS.currentQuestionIndex)) || 0),
    targetLevel: Number(localStorage.getItem(EXAM_STORAGE_KEYS.targetLevel)) || 3,
    optionOrders: readJson(EXAM_STORAGE_KEYS.optionOrders, {})
  };
}

async function loadQuestionBank() {
  if (state.questionBank) return state.questionBank;

  const domainBanks = await Promise.all(EXAM_DOMAINS.map(async (domain) => {
    const response = await fetch(domain.file, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Impossible de charger ${domain.file}.`);
    }
    return response.json();
  }));

  state.questionBank = domainBanks.flat().map((question) => ({
    ...question,
    level: Number(question.level),
    type: question.type || (question.answers?.length > 1 ? "multiple" : "single")
  }));
  return state.questionBank;
}

function composeExamQuestions(bank) {
  const selected = generateExamQuestionSet(bank);

  if (!selected || selected.length !== EXAM_TOTAL_QUESTIONS) {
    throw new Error(`Impossible de generer un examen aleatoire de ${EXAM_TOTAL_QUESTIONS} questions avec les quotas actuels.`);
  }

  return shuffleArray(selected);
}

function generateExamQuestionSet(bank) {
  const domainRemaining = Object.fromEntries(EXAM_DOMAINS.map((domain) => [domain.id, domain.quota]));
  const levelRemaining = { ...EXAM_LEVEL_QUOTAS };
  const pools = buildQuestionPools(bank);
  return pickExamQuestions(pools, domainRemaining, levelRemaining, new Set(), []);
}

function buildQuestionPools(bank) {
  const pools = new Map();
  bank.forEach((question) => {
    const key = quotaKey(question.domain, question.level);
    pools.set(key, [...(pools.get(key) ?? []), question]);
  });
  pools.forEach((questions, key) => {
    pools.set(key, shuffleArray(questions));
  });
  return pools;
}

function pickExamQuestions(pools, domainRemaining, levelRemaining, usedIds, selected) {
  if (selected.length === EXAM_TOTAL_QUESTIONS) {
    return quotasComplete(domainRemaining, levelRemaining) ? selected : null;
  }

  if (!quotasFeasible(pools, domainRemaining, levelRemaining, usedIds)) {
    return null;
  }

  const slot = getMostConstrainedSlot(pools, domainRemaining, levelRemaining, usedIds);
  if (!slot) return null;

  for (const question of slot.candidates) {
    usedIds.add(question.id);
    domainRemaining[question.domain] -= 1;
    levelRemaining[question.level] -= 1;

    const result = pickExamQuestions(pools, domainRemaining, levelRemaining, usedIds, [...selected, question]);
    if (result) return result;

    levelRemaining[question.level] += 1;
    domainRemaining[question.domain] += 1;
    usedIds.delete(question.id);
  }

  return null;
}

function getMostConstrainedSlot(pools, domainRemaining, levelRemaining, usedIds) {
  const slots = [];
  EXAM_DOMAINS.forEach((domain) => {
    if (domainRemaining[domain.id] <= 0) return;
    Object.keys(EXAM_LEVEL_QUOTAS).forEach((level) => {
      if (levelRemaining[level] <= 0) return;
      const candidates = getPoolCandidates(pools, domain.id, Number(level), usedIds);
      if (candidates.length > 0) {
        slots.push({ domain: domain.id, level: Number(level), candidates });
      }
    });
  });
  return slots.sort((left, right) => left.candidates.length - right.candidates.length)[0] ?? null;
}

function quotasFeasible(pools, domainRemaining, levelRemaining, usedIds) {
  const domainsOk = EXAM_DOMAINS.every((domain) => {
    const available = Object.keys(EXAM_LEVEL_QUOTAS).reduce((sum, level) => (
      levelRemaining[level] > 0 ? sum + getPoolCandidates(pools, domain.id, Number(level), usedIds).length : sum
    ), 0);
    return available >= domainRemaining[domain.id];
  });
  const levelsOk = Object.keys(EXAM_LEVEL_QUOTAS).every((level) => {
    const available = EXAM_DOMAINS.reduce((sum, domain) => (
      domainRemaining[domain.id] > 0 ? sum + getPoolCandidates(pools, domain.id, Number(level), usedIds).length : sum
    ), 0);
    return available >= levelRemaining[level];
  });
  return domainsOk && levelsOk;
}

function getPoolCandidates(pools, domain, level, usedIds) {
  return (pools.get(quotaKey(domain, level)) ?? []).filter((question) => !usedIds.has(question.id));
}

function quotasComplete(domainRemaining, levelRemaining) {
  return Object.values(domainRemaining).every((count) => count === 0)
    && Object.values(levelRemaining).every((count) => count === 0);
}

function quotaKey(domain, level) {
  return `${domain}:${level}`;
}

function createOptionOrders(questions) {
  return Object.fromEntries(questions.map((question) => {
    const count = getChoiceList(question).length;
    const order = count > 0 ? shuffleArray(Array.from({ length: count }, (_value, index) => index)) : [];
    return [question.id, order];
  }));
}

function renderExamQuestion(session) {
  const question = session.questions[session.currentQuestionIndex];
  const remainingSeconds = getRemainingSeconds(session);
  const answeredCount = getAnsweredCount(session);
  const timerClass = remainingSeconds <= 120 ? "danger" : remainingSeconds <= 600 ? "warning" : "";

  els.content.innerHTML = `
    <section class="exam-shell" aria-labelledby="examQuestionTitle">
      <header class="exam-topbar">
        <div>
          <p class="eyebrow">Question ${session.currentQuestionIndex + 1} / ${EXAM_TOTAL_QUESTIONS}</p>
          <h1 id="examQuestionTitle">${escapeHtml(question.question)}</h1>
        </div>
        <div class="exam-timer ${timerClass}" data-exam-timer>
          <span>Temps restant</span>
          <strong>${formatDuration(remainingSeconds)}</strong>
        </div>
      </header>
      <div class="exam-meta">
        <span>${escapeHtml(getDomainLabel(question.domain))}</span>
        <span>Niveau ${escapeHtml(question.level)}</span>
        <span>${escapeHtml(getTypeLabel(question.type))}</span>
        <span>Niveau cible adaptatif ${escapeHtml(session.targetLevel)}</span>
        <span>Score masque pendant l'examen</span>
      </div>
      <form class="exam-question" data-question-id="${escapeHtml(question.id)}">
        ${renderExamQuestionBody(question, session)}
      </form>
      <div class="exam-progress">
        <strong>${answeredCount} / ${EXAM_TOTAL_QUESTIONS}</strong>
        <span>questions repondues</span>
      </div>
      <div class="exam-map" aria-label="Etat des questions">
        ${session.questions.map((item, index) => `
          <button type="button" class="${index === session.currentQuestionIndex ? "active" : ""} ${isQuestionAnswered(item, session.answers[item.id]) ? "answered" : ""}" data-exam-jump="${index}" aria-label="Question ${index + 1}">
            ${index + 1}
          </button>
        `).join("")}
      </div>
      <nav class="exam-actions" aria-label="Navigation de l'examen">
        <button class="button ghost" type="button" data-exam-action="previous" ${session.currentQuestionIndex === 0 ? "disabled" : ""}>Precedent</button>
        <button class="button ghost" type="button" data-exam-action="next" ${session.currentQuestionIndex === EXAM_TOTAL_QUESTIONS - 1 ? "disabled" : ""}>Suivant</button>
        <button class="button danger" type="button" data-exam-action="finish">Terminer l'examen</button>
        <button class="button ghost" type="button" data-exam-action="abandon">Abandonner</button>
      </nav>
    </section>
  `;

  restoreExamAnswer(question, session.answers[question.id]);
  bindExamQuestion(session);
  startExamTimer(session);
  els.content.focus({ preventScroll: true });
}

function renderExamQuestionBody(question, session) {
  if (question.type === "code-fix") {
    return `
      <label class="exam-code-fix">
        <span>Zone de reponse</span>
        <textarea spellcheck="false">${escapeHtml(question.code ?? "")}</textarea>
      </label>
    `;
  }

  if (question.code) {
    return `<pre class="exam-code"><code>${escapeHtml(question.code)}</code></pre>${renderExamChoices(question, session)}`;
  }

  if (question.type === "match") {
    return `
      <div class="exam-match">
        ${(question.items ?? []).map((item, index) => `
          <label>
            <span>${escapeHtml(item.prompt)}</span>
            <select data-match-index="${index}">
              <option value="">Choisir...</option>
              ${(question.choices ?? []).map((choice) => `<option value="${escapeHtml(choice)}">${escapeHtml(choice)}</option>`).join("")}
            </select>
          </label>
        `).join("")}
      </div>
    `;
  }

  if (question.type === "order") {
    const order = session.optionOrders[question.id] ?? getChoiceList(question).map((_value, index) => index);
    return `
      <div class="exam-order">
        ${order.map((optionIndex) => `
          <label>
            <span>${escapeHtml(question.options[optionIndex])}</span>
            <select data-order-index="${optionIndex}">
              <option value="">Position...</option>
              ${question.options.map((_option, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}
            </select>
          </label>
        `).join("")}
      </div>
    `;
  }

  return renderExamChoices(question, session);
}

function renderExamChoices(question, session) {
  const multiple = question.type === "multiple" || (question.answers ?? []).length > 1;
  const inputType = multiple ? "checkbox" : "radio";
  const order = session.optionOrders[question.id] ?? getChoiceList(question).map((_value, index) => index);

  return `
    <fieldset>
      <legend class="sr-only">${escapeHtml(question.question)}</legend>
      <div class="exam-options">
        ${order.map((optionIndex) => `
          <label>
            <input type="${inputType}" name="exam-answer" value="${optionIndex}" />
            <span>${escapeHtml(question.options[optionIndex])}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function bindExamQuestion(session) {
  els.content.querySelector(".exam-question").addEventListener("change", () => {
    saveCurrentExamAnswer(session);
  });

  els.content.querySelectorAll("[data-exam-jump]").forEach((button) => {
    button.addEventListener("click", () => moveExamTo(Number(button.dataset.examJump)));
  });

  els.content.querySelector('[data-exam-action="previous"]').addEventListener("click", () => moveExamTo(session.currentQuestionIndex - 1));
  els.content.querySelector('[data-exam-action="next"]').addEventListener("click", () => moveExamNext(session));
  els.content.querySelector('[data-exam-action="finish"]').addEventListener("click", () => {
    if (confirm("Terminer l'examen maintenant ? Les corrections seront affichees apres soumission.")) {
      saveCurrentExamAnswer(session);
      submitExam("manual");
    }
  });
  els.content.querySelector('[data-exam-action="abandon"]').addEventListener("click", () => {
    if (confirm("Abandonner cet examen blanc ? La progression en cours sera supprimee.")) {
      clearActiveExam();
      render();
    }
  });
}

function saveCurrentExamAnswer(session) {
  const question = session.questions[session.currentQuestionIndex];
  const form = els.content.querySelector(".exam-question");
  const nextAnswers = { ...session.answers };

  if (question.type === "match") {
    nextAnswers[question.id] = Array.from(form.querySelectorAll("[data-match-index]")).map((select) => select.value);
  } else if (question.type === "order") {
    nextAnswers[question.id] = Object.fromEntries(Array.from(form.querySelectorAll("[data-order-index]")).map((select) => [
      select.dataset.orderIndex,
      Number(select.value) || null
    ]));
  } else if (question.type === "code-fix") {
    nextAnswers[question.id] = form.querySelector("textarea")?.value ?? "";
  } else {
    const selected = Array.from(form.querySelectorAll("input:checked")).map((input) => Number(input.value));
    nextAnswers[question.id] = question.type === "multiple" ? selected : selected[0] ?? null;
  }

  localStorage.setItem(EXAM_STORAGE_KEYS.answers, JSON.stringify(nextAnswers));
  return nextAnswers;
}

function restoreExamAnswer(question, answer) {
  if (answer === undefined || answer === null) return;

  if (question.type === "match") {
    els.content.querySelectorAll("[data-match-index]").forEach((select, index) => {
      select.value = answer[index] ?? "";
    });
    return;
  }

  if (question.type === "order") {
    els.content.querySelectorAll("[data-order-index]").forEach((select) => {
      select.value = answer[select.dataset.orderIndex] ?? "";
    });
    return;
  }

  if (question.type === "code-fix") {
    const textarea = els.content.querySelector(".exam-code-fix textarea");
    if (textarea) textarea.value = answer;
    return;
  }

  const values = Array.isArray(answer) ? answer : [answer];
  els.content.querySelectorAll("input").forEach((input) => {
    input.checked = values.includes(Number(input.value));
  });
}

async function moveExamTo(index) {
  const session = await getExamSession();
  if (!session) return;
  saveCurrentExamAnswer(session);
  localStorage.setItem(EXAM_STORAGE_KEYS.currentQuestionIndex, String(clampIndex(index)));
  await render();
}

async function moveExamNext(session) {
  const answers = saveCurrentExamAnswer(session);
  const currentQuestion = session.questions[session.currentQuestionIndex];
  const answered = isQuestionAnswered(currentQuestion, answers[currentQuestion.id]);
  const correct = answered && await isAnswerCorrectAsync(currentQuestion, answers[currentQuestion.id]);
  const targetLevel = answered
    ? Math.min(5, Math.max(1, session.targetLevel + (correct ? 1 : -1)))
    : session.targetLevel;
  const nextIndex = getNextAdaptiveQuestionIndex(session.questions, answers, session.currentQuestionIndex, targetLevel);

  localStorage.setItem(EXAM_STORAGE_KEYS.targetLevel, String(targetLevel));
  localStorage.setItem(EXAM_STORAGE_KEYS.currentQuestionIndex, String(nextIndex));
  await render();
}

function getNextAdaptiveQuestionIndex(questions, answers, currentIndex, targetLevel) {
  const candidates = questions
    .map((question, index) => ({ question, index }))
    .filter((item) => item.index !== currentIndex && !isQuestionAnswered(item.question, answers[item.question.id]));

  if (candidates.length === 0) {
    return clampIndex(currentIndex + 1);
  }

  candidates.sort((left, right) => {
    const leftDistance = Math.abs(left.question.level - targetLevel);
    const rightDistance = Math.abs(right.question.level - targetLevel);
    if (leftDistance !== rightDistance) return leftDistance - rightDistance;
    return left.index - right.index;
  });

  return candidates[0].index;
}

async function submitExam(reason) {
  const session = await getExamSession();
  if (!session) return;
  const result = await buildExamResult(session, reason);
  localStorage.setItem(EXAM_STORAGE_KEYS.result, JSON.stringify(result));
  saveExamHistory(result);
  clearActiveExam();
  window.location.hash = "#/exam/result";
}

async function buildExamResult(session, reason) {
  const details = await Promise.all(session.questions.map(async (question) => {
    const userAnswer = session.answers[question.id];
    return {
      id: question.id,
      domain: question.domain,
      level: question.level,
      type: question.type,
      question: question.question,
      explanation: question.explanation,
      options: question.options,
      items: question.items,
      choices: question.choices,
      checks: question.checks,
      solution: question.solution,
      answers: question.answers,
      references: question.references,
      userAnswer,
      correct: await isAnswerCorrectAsync(question, userAnswer)
    };
  }));
  const correctById = new Map(details.map((detail) => [detail.id, detail.correct]));
  const estimatedScore = calculateEstimatedTosaScore(session.questions, session.answers, correctById);
  const usedSeconds = Math.min(EXAM_DURATION_SECONDS, Math.max(0, Math.round((Date.now() - session.startedAt) / 1000)));
  const domains = EXAM_DOMAINS.map((domain) => {
    const domainDetails = details.filter((detail) => detail.domain === domain.id);
    return {
      id: domain.id,
      label: domain.label,
      correct: domainDetails.filter((detail) => detail.correct).length,
      total: domainDetails.length
    };
  });
  const types = getTypeStats(details);

  return {
    id: `exam-${Date.now()}`,
    score: estimatedScore.score,
    rawScore: estimatedScore.rawScore,
    theta: estimatedScore.theta,
    balancePenalty: estimatedScore.balancePenalty,
    level: estimatedScore.level,
    correctCount: estimatedScore.correctAnswers,
    total: EXAM_TOTAL_QUESTIONS,
    usedSeconds,
    reason,
    submittedAt: new Date().toISOString(),
    domains,
    types,
    details
  };
}

async function renderExamResult() {
  const active = await getExamSession();
  if (active && getRemainingSeconds(active) <= 0) {
    submitExam("time");
    return;
  }

  const result = readJson(EXAM_STORAGE_KEYS.result, null);
  if (!result) {
    els.content.innerHTML = `
      <div class="error-box">
        <h1>Aucun resultat disponible</h1>
        <p>Lance un examen blanc pour obtenir un score estime et une correction detaillee.</p>
        <a class="button primary" href="#/exam">Commencer un examen</a>
      </div>
    `;
    return;
  }

  const weakestDomains = [...result.domains]
    .sort((left, right) => (left.correct / left.total) - (right.correct / right.total))
    .slice(0, 3);
  const mistakes = result.details.filter((detail) => !detail.correct);
  const badges = getResultBadges(result);
  const revisionTopics = getRevisionTopics(result.details);

  els.content.innerHTML = `
    <section class="exam-result" aria-labelledby="resultTitle">
      <p class="eyebrow">Score estime non officiel</p>
      <h1 id="resultTitle">${result.score} / 1000</h1>
      <div class="result-summary">
        <div><span>Niveau</span><strong>${escapeHtml(result.level)}</strong></div>
        <div><span>Bonnes reponses</span><strong>${result.correctCount} / ${result.total}</strong></div>
        <div><span>Temps utilise</span><strong>${formatUsedTime(result.usedSeconds)}</strong></div>
        <div><span>Score brut</span><strong>${result.rawScore ?? result.score}</strong></div>
        <div><span>Equilibre domaines</span><strong>-${result.balancePenalty ?? 0}</strong></div>
        <div><span>Theta estime</span><strong>${formatTheta(result.theta)}</strong></div>
      </div>
      <p class="exam-note">Ce score est une estimation pedagogique inspiree des modeles adaptatifs. Il ne correspond pas au score officiel TOSA.</p>

      ${renderScoringExplanation(result)}

      <section class="badge-section" aria-labelledby="badgesTitle">
        <h2 id="badgesTitle">Badges de progression</h2>
        <div class="badge-grid">
          ${badges.map((badge) => `
            <div class="progress-badge">
              <strong>${escapeHtml(badge.title)}</strong>
              <span>${escapeHtml(badge.description)}</span>
            </div>
          `).join("")}
        </div>
      </section>

      <section class="domain-results" aria-labelledby="domainsTitle">
        <h2 id="domainsTitle">Analyse par competence</h2>
        ${renderCompetencyRadar(result.domains)}
        ${result.domains.map((domain) => `
          <div class="domain-row">
            <span>${escapeHtml(domain.label)}</span>
            <strong>${domain.correct} / ${domain.total}</strong>
          </div>
        `).join("")}
      </section>

      <section class="type-results" aria-labelledby="typesTitle">
        <h2 id="typesTitle">Analyse par format</h2>
        ${(result.types ?? []).map((type) => `
          <div class="domain-row">
            <span>${escapeHtml(type.label)}</span>
            <strong>${type.correct} / ${type.total}</strong>
          </div>
        `).join("")}
      </section>

      <section class="revision-advice" aria-labelledby="adviceTitle">
        <h2 id="adviceTitle">Priorites de revision</h2>
        <ol>
          ${weakestDomains.map((domain) => `<li><a href="#/practice/domain/${encodeURIComponent(domain.id)}">${escapeHtml(domain.label)}</a></li>`).join("")}
        </ol>
        ${revisionTopics.length ? `
          <div class="topic-grid">
            ${revisionTopics.map((topic) => `
              <a href="#/practice/topic/${encodeURIComponent(topic.key)}">
                <strong>${escapeHtml(topic.label)}</strong>
                <span>${topic.count} erreur${topic.count > 1 ? "s" : ""}</span>
              </a>
            `).join("")}
          </div>
        ` : ""}
      </section>

      <section class="mistake-list" aria-labelledby="mistakesTitle">
        <h2 id="mistakesTitle">Erreurs et corrections</h2>
        ${mistakes.length ? mistakes.map(renderMistake).join("") : `<p>Toutes les questions sont correctes.</p>`}
      </section>

      <div class="course-actions">
        <a class="button primary" href="#/exam">Refaire un examen</a>
        <a class="button ghost" href="#/practice/quick">Revision rapide</a>
        <a class="button ghost" href="#/exam/history">Historique</a>
        <a class="button ghost" href="#/">Retour a l'accueil</a>
      </div>
    </section>
  `;
}

function renderScoringExplanation(result) {
  return `
    <section class="scoring-model" aria-labelledby="scoreModelTitle">
      <h2 id="scoreModelTitle">Lecture du score</h2>
      <div class="scoring-grid">
        <article>
          <strong>Difficulte</strong>
          <span>Les questions de niveau eleve pesent plus dans l'estimation.</span>
        </article>
        <article>
          <strong>Type</strong>
          <span>Le hasard compte moins pour le code, l'ordre et les associations.</span>
        </article>
        <article>
          <strong>Equilibre</strong>
          <span>${result.balancePenalty ? `-${result.balancePenalty} points si les domaines sont trop inegaux.` : "Aucune penalite d'equilibre appliquee."}</span>
        </article>
      </div>
    </section>
  `;
}

function renderCompetencyRadar(domains) {
  const center = 90;
  const maxRadius = 70;
  const points = domains.map((domain, index) => {
    const ratio = domain.total ? domain.correct / domain.total : 0;
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / domains.length;
    const radius = 18 + ratio * (maxRadius - 18);
    return [
      Math.round(center + Math.cos(angle) * radius),
      Math.round(center + Math.sin(angle) * radius)
    ];
  });
  const gridPoints = domains.map((_domain, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / domains.length;
    return [
      Math.round(center + Math.cos(angle) * maxRadius),
      Math.round(center + Math.sin(angle) * maxRadius)
    ];
  });

  return `
    <div class="competency-radar" aria-label="Radar de competences">
      <svg viewBox="0 0 180 180" role="img" aria-label="Radar des scores par domaine">
        <polygon class="radar-grid" points="${gridPoints.map((point) => point.join(",")).join(" ")}"></polygon>
        ${gridPoints.map((point) => `<line class="radar-axis" x1="${center}" y1="${center}" x2="${point[0]}" y2="${point[1]}"></line>`).join("")}
        <polygon class="radar-score" points="${points.map((point) => point.join(",")).join(" ")}"></polygon>
      </svg>
      <div class="radar-legend">
        ${domains.map((domain) => `<span>${escapeHtml(domain.label)} ${domain.total ? Math.round((domain.correct / domain.total) * 100) : 0}%</span>`).join("")}
      </div>
    </div>
  `;
}

function getResultBadges(result) {
  const badges = [];
  if (result.score >= 551) {
    badges.push({ title: "Seuil certification", description: "Score estime au-dessus du seuil 551." });
  }
  if (result.score >= 876) {
    badges.push({ title: "Expert", description: "Performance estimee dans le palier expert." });
  }
  if (result.correctCount >= 28) {
    badges.push({ title: "Precision", description: "Au moins 80% de bonnes reponses." });
  }
  if (result.usedSeconds <= 60 * 60) {
    badges.push({ title: "Rythme solide", description: "Examen termine en moins d'une heure." });
  }
  result.domains
    .filter((domain) => domain.correct === domain.total && domain.total > 0)
    .forEach((domain) => {
      badges.push({ title: `Sans faute ${domain.label}`, description: "Toutes les questions du domaine sont correctes." });
    });

  return badges.length ? badges : [{ title: "Diagnostic lance", description: "Premier profil de revision disponible." }];
}

function getTypeStats(details) {
  const order = ["single", "multiple", "code-output", "code-fix", "match", "order"];
  return order
    .map((type) => {
      const items = details.filter((detail) => detail.type === type);
      return {
        id: type,
        label: getTypeLabel(type),
        correct: items.filter((detail) => detail.correct).length,
        total: items.length
      };
    })
    .filter((item) => item.total > 0);
}

function getRevisionTopics(details) {
  const topics = details
    .filter((detail) => !detail.correct)
    .reduce((counts, detail) => {
      const keys = [detail.topic, ...(detail.references ?? [])].filter(Boolean);
      keys.forEach((key) => {
        const normalizedKey = normalize(key);
        counts.set(normalizedKey, {
          key: normalizedKey,
          label: key,
          count: (counts.get(normalizedKey)?.count ?? 0) + 1
        });
      });
      return counts;
    }, new Map());

  return [...topics.values()]
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
    .slice(0, 6);
}

function calculateEstimatedTosaScore(questions, userAnswers, correctById = null) {
  const normalizedQuestions = questions.map(normalizeQuestionForScoring);
  const theta = estimateTheta(normalizedQuestions, userAnswers, correctById);
  const rawScore = thetaToScore(theta);
  const domainStats = calculateDomainStats(normalizedQuestions, userAnswers, correctById);
  const balancePenalty = calculateBalancePenalty(domainStats);
  const score = Math.max(1, rawScore - balancePenalty);

  return {
    score,
    rawScore,
    theta,
    level: getScoreLevel(score),
    domainStats,
    balancePenalty,
    correctAnswers: normalizedQuestions.filter((question) => getQuestionCorrectness(question, userAnswers, correctById)).length,
    totalQuestions: normalizedQuestions.length
  };
}

function normalizeQuestionForScoring(question) {
  return {
    ...question,
    difficulty: question.difficulty ?? DEFAULT_DIFFICULTY_BY_LEVEL[question.level] ?? 0,
    guessing: question.guessing ?? DEFAULT_GUESSING_BY_TYPE[question.type] ?? 0.2,
    discrimination: question.discrimination ?? DEFAULT_DISCRIMINATION_BY_TYPE[question.type] ?? 1
  };
}

function estimateTheta(questions, userAnswers, correctById = null) {
  let bestTheta = 0;
  let bestLikelihood = -Infinity;

  for (let theta = -3; theta <= 3; theta += 0.02) {
    const likelihood = questions.reduce((sum, question) => {
      const probability = clampProbability(probabilityCorrect(theta, question));
      const correct = getQuestionCorrectness(question, userAnswers, correctById);
      return sum + Math.log(correct ? probability : 1 - probability);
    }, 0);

    if (likelihood > bestLikelihood) {
      bestLikelihood = likelihood;
      bestTheta = theta;
    }
  }

  return Number(bestTheta.toFixed(2));
}

function probabilityCorrect(theta, question) {
  const a = question.discrimination;
  const b = question.difficulty;
  const c = question.guessing;
  return c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
}

function thetaToScore(theta) {
  const normalized = (theta + 3) / 6;
  return Math.max(1, Math.min(1000, Math.round(1 + normalized * 999)));
}

function calculateDomainStats(questions, userAnswers, correctById = null) {
  return questions.reduce((stats, question) => {
    if (!stats[question.domain]) {
      stats[question.domain] = { total: 0, correct: 0, rate: 0 };
    }
    stats[question.domain].total += 1;
    if (getQuestionCorrectness(question, userAnswers, correctById)) {
      stats[question.domain].correct += 1;
    }
    stats[question.domain].rate = stats[question.domain].correct / stats[question.domain].total;
    return stats;
  }, {});
}

function getQuestionCorrectness(question, userAnswers, correctById = null) {
  if (correctById?.has(question.id)) return correctById.get(question.id);
  return isAnswerCorrect(question, userAnswers[question.id]);
}

function calculateBalancePenalty(domainStats) {
  const rates = Object.values(domainStats).map((stat) => stat.rate);
  if (rates.length === 0) return 0;
  const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  const variance = rates.reduce((sum, rate) => sum + (rate - average) ** 2, 0) / rates.length;
  return Math.round(Math.min(80, Math.sqrt(variance) * 160));
}

function clampProbability(value) {
  return Math.min(0.999999, Math.max(0.000001, value));
}

function renderExamHistoryPreview() {
  const history = readJson(EXAM_STORAGE_KEYS.history, []);
  if (!Array.isArray(history) || history.length === 0) return "";

  return `
    <section class="exam-history" aria-labelledby="historyTitle">
      <h2 id="historyTitle">Historique recent</h2>
      <div class="history-grid">
        ${history.slice(0, 4).map((item) => `
          <article>
            <strong>${item.score} / 1000</strong>
            <span>${escapeHtml(item.level)} - ${item.correctCount} / ${item.total}</span>
            <small>${escapeHtml(formatHistoryDate(item.submittedAt))}</small>
          </article>
        `).join("")}
      </div>
      <a class="button ghost" href="#/exam/history">Voir tout l'historique</a>
    </section>
  `;
}

function renderExamHistoryPage() {
  const history = readJson(EXAM_STORAGE_KEYS.history, []);
  const items = Array.isArray(history) ? history : [];
  const stats = getHistoryStats(items);

  els.content.innerHTML = `
    <section class="exam-result" aria-labelledby="historyPageTitle">
      <p class="eyebrow">Progression</p>
      <h1 id="historyPageTitle">Historique des examens</h1>
      ${items.length ? `
        <div class="result-summary">
          <div><span>Tentatives</span><strong>${items.length}</strong></div>
          <div><span>Meilleur score</span><strong>${stats.bestScore} / 1000</strong></div>
          <div><span>Moyenne</span><strong>${stats.averageScore} / 1000</strong></div>
          <div><span>Dernier score</span><strong>${stats.lastScore} / 1000</strong></div>
          <div><span>Progression</span><strong>${formatScoreDelta(stats.delta)}</strong></div>
          <div><span>Domaine a revoir</span><strong>${escapeHtml(stats.weakestDomain)}</strong></div>
        </div>
      ` : ""}
      ${items.length ? `
        <div class="history-table">
          ${items.map((item) => `
            <article>
              <div>
                <strong>${item.score} / 1000</strong>
                <span>${escapeHtml(item.level)} - ${item.correctCount} / ${item.total} bonnes reponses</span>
              </div>
              <small>${escapeHtml(formatHistoryDate(item.submittedAt))}</small>
              <div class="history-domains">
                ${(item.domains ?? []).map((domain) => `<span>${escapeHtml(domain.label)} ${domain.correct}/${domain.total}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      ` : `<div class="empty-catalog"><h3>Aucun examen termine</h3><p>L'historique se remplira apres ta premiere soumission.</p></div>`}
      <div class="course-actions">
        <a class="button primary" href="#/exam">Nouvel examen</a>
        <a class="button ghost" href="#/practice/quick">Revision rapide</a>
        ${items.length ? `<button class="button ghost" type="button" data-history-action="clear">Effacer l'historique local</button>` : ""}
      </div>
    </section>
  `;

  els.content.querySelector('[data-history-action="clear"]')?.addEventListener("click", () => {
    if (!confirm("Effacer l'historique local des examens ?")) return;
    localStorage.removeItem(EXAM_STORAGE_KEYS.history);
    renderExamHistoryPage();
  });
}

function getHistoryStats(items) {
  const scores = items.map((item) => item.score);
  const newest = items[0];
  const oldest = items[items.length - 1];
  const domainTotals = new Map();

  items.forEach((item) => {
    (item.domains ?? []).forEach((domain) => {
      const current = domainTotals.get(domain.id) ?? { label: domain.label, correct: 0, total: 0 };
      current.correct += domain.correct;
      current.total += domain.total;
      domainTotals.set(domain.id, current);
    });
  });

  const weakest = [...domainTotals.values()]
    .filter((domain) => domain.total > 0)
    .sort((left, right) => (left.correct / left.total) - (right.correct / right.total))[0];

  return {
    bestScore: Math.max(...scores),
    averageScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
    lastScore: newest.score,
    delta: newest.score - oldest.score,
    weakestDomain: weakest?.label ?? "Aucun"
  };
}

function saveExamHistory(result) {
  const history = readJson(EXAM_STORAGE_KEYS.history, []);
  const nextHistory = [summarizeExamResult(result), ...(Array.isArray(history) ? history : [])].slice(0, 10);
  localStorage.setItem(EXAM_STORAGE_KEYS.history, JSON.stringify(nextHistory));
}

function summarizeExamResult(result) {
  return {
    id: result.id,
    score: result.score,
    level: result.level,
    correctCount: result.correctCount,
    total: result.total,
    usedSeconds: result.usedSeconds,
    submittedAt: result.submittedAt,
    rawScore: result.rawScore,
    theta: result.theta,
    balancePenalty: result.balancePenalty,
    domains: result.domains,
    types: result.types
  };
}

function renderMistake(detail) {
  return `
    <article class="mistake-card">
      <div class="tosa-head">
        <span>${escapeHtml(getDomainLabel(detail.domain))}</span>
        <small>Niveau ${escapeHtml(detail.level)}</small>
      </div>
      <h3>${escapeHtml(detail.question)}</h3>
      <p><strong>Ta reponse :</strong> ${escapeHtml(formatAnswer(detail, detail.userAnswer))}</p>
      <p><strong>Correction :</strong> ${escapeHtml(formatCorrectAnswer(detail))}</p>
      ${detail.explanation ? `<p>${escapeHtml(detail.explanation)}</p>` : ""}
    </article>
  `;
}

function isAnswerCorrect(question, userAnswer) {
  if (question.type === "match") {
    return Array.isArray(userAnswer)
      && (question.items ?? []).every((item, index) => userAnswer[index] === item.answer);
  }

  if (question.type === "order") {
    if (!userAnswer || typeof userAnswer !== "object") return false;
    return (question.answers ?? []).every((optionIndex, rank) => Number(userAnswer[optionIndex]) === rank + 1);
  }

  if (question.type === "code-fix") {
    return typeof userAnswer === "string"
      && (question.checks ?? []).length > 0
      && question.checks.every((check) => evaluateCodeCheck(userAnswer, check).pass);
  }

  const expected = normalizeAnswers(question.answers);
  const actual = Array.isArray(userAnswer) ? userAnswer.map(Number) : [Number(userAnswer)];
  return sameNumberSet(actual.filter(Number.isInteger), expected);
}

async function isAnswerCorrectAsync(question, userAnswer) {
  if (question.type === "code-fix" && Array.isArray(question.tests) && question.tests.length > 0) {
    if (typeof userAnswer !== "string" || userAnswer.trim() === "") return false;
    const results = await evaluateCodeExercise(userAnswer, question);
    return results.length > 0 && results.every((result) => result.pass);
  }

  return isAnswerCorrect(question, userAnswer);
}

function isQuestionAnswered(question, answer) {
  if (question.type === "match") {
    return Array.isArray(answer) && answer.length > 0 && answer.every(Boolean);
  }

  if (question.type === "order") {
    return answer && Object.values(answer).length > 0 && Object.values(answer).every(Boolean);
  }

  if (question.type === "code-fix") {
    return typeof answer === "string" && answer.trim() !== "" && answer !== question.code;
  }

  return Array.isArray(answer) ? answer.length > 0 : answer !== undefined && answer !== null;
}

function getAnsweredCount(session) {
  return session.questions.filter((question) => isQuestionAnswered(question, session.answers[question.id])).length;
}

function formatAnswer(detail, answer) {
  if (!isQuestionAnswered(detail, answer)) return "Non repondu";

  if (detail.type === "match") {
    return (detail.items ?? []).map((item, index) => `${item.prompt} -> ${answer[index] || "?"}`).join(" ; ");
  }

  if (detail.type === "order") {
    return Object.entries(answer)
      .sort((left, right) => Number(left[1]) - Number(right[1]))
      .map(([optionIndex]) => detail.options[optionIndex])
      .join(" -> ");
  }

  if (detail.type === "code-fix") {
    return answer;
  }

  const indexes = Array.isArray(answer) ? answer : [answer];
  return indexes.map((index) => detail.options[index]).filter(Boolean).join(", ");
}

function formatCorrectAnswer(detail) {
  if (detail.type === "match") {
    return (detail.items ?? []).map((item) => `${item.prompt} -> ${item.answer}`).join(" ; ");
  }

  if (detail.type === "order") {
    return (detail.answers ?? []).map((index) => detail.options[index]).join(" -> ");
  }

  if (detail.type === "code-fix") {
    return detail.solution ?? "Respecter tous les points de controle attendus.";
  }

  return normalizeAnswers(detail.answers).map((index) => detail.options[index]).filter(Boolean).join(", ");
}

function startExamTimer(session) {
  const update = () => {
    const remaining = getRemainingSeconds(session);
    const timer = els.content.querySelector("[data-exam-timer]");
    if (timer) {
      timer.classList.toggle("warning", remaining <= 600 && remaining > 120);
      timer.classList.toggle("danger", remaining <= 120);
      timer.querySelector("strong").textContent = formatDuration(remaining);
    }
    if (remaining <= 0) {
      clearExamTimer();
      submitExam("time");
    }
  };

  update();
  state.examTimerId = window.setInterval(update, 1000);
}

function clearExamTimer() {
  if (state.examTimerId) {
    window.clearInterval(state.examTimerId);
    state.examTimerId = null;
  }
}

function getRemainingSeconds(session) {
  return Math.max(0, Math.ceil((session.endsAt - Date.now()) / 1000));
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatUsedTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes} min ${String(secs).padStart(2, "0")} s`;
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatTheta(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

function formatScoreDelta(value) {
  if (!Number.isFinite(value) || value === 0) return "0";
  return `${value > 0 ? "+" : ""}${value}`;
}

function getScoreLevel(score) {
  if (score <= 350) return "Initial";
  if (score <= 550) return "Basique";
  if (score <= 725) return "Operationnel";
  if (score <= 875) return "Avance";
  return "Expert";
}

function getDomainLabel(domainId) {
  return EXAM_DOMAINS.find((domain) => domain.id === domainId)?.label ?? domainId;
}

function getTypeLabel(type) {
  return {
    single: "QCM",
    multiple: "Multi-reponses",
    "code-output": "Resultat de code",
    "code-fix": "Code a corriger",
    match: "Association",
    order: "Ordre"
  }[type] ?? type;
}

function getChoiceList(question) {
  return question.type === "match" ? question.choices ?? [] : question.options ?? [];
}

function clampIndex(index) {
  return Math.min(EXAM_TOTAL_QUESTIONS - 1, Math.max(0, index));
}

function shuffleArray(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_error) {
    return fallback;
  }
}

function clearActiveExam() {
  [
    EXAM_STORAGE_KEYS.startedAt,
    EXAM_STORAGE_KEYS.endsAt,
    EXAM_STORAGE_KEYS.answers,
    EXAM_STORAGE_KEYS.questionIds,
    EXAM_STORAGE_KEYS.currentQuestionIndex,
    EXAM_STORAGE_KEYS.targetLevel,
    EXAM_STORAGE_KEYS.optionOrders
  ].forEach((key) => localStorage.removeItem(key));
  clearExamTimer();
}

function hasStoredExamResult() {
  return Boolean(localStorage.getItem(EXAM_STORAGE_KEYS.result));
}

function hasExamHistory() {
  const history = readJson(EXAM_STORAGE_KEYS.history, []);
  return Array.isArray(history) && history.length > 0;
}

function hasActiveExam() {
  return Boolean(localStorage.getItem(EXAM_STORAGE_KEYS.startedAt))
    && Boolean(localStorage.getItem(EXAM_STORAGE_KEYS.endsAt));
}

async function renderPracticeRoute(mode = "all", target = null) {
  clearExamTimer();
  const targetLabel = getPracticeTargetLabel(mode, target);
  els.breadcrumb.innerHTML = renderBreadcrumb([
    ["Formations", routeHref()],
    [targetLabel]
  ]);
  els.content.className = "content practice-content";
  els.pager.innerHTML = "";

  const bank = await loadQuestionBank();
  const mistakes = readPracticeMistakes();
  const questions = getPracticeQuestions(bank, mistakes, mode, target);

  els.content.innerHTML = `
    <section class="practice-shell" aria-labelledby="practiceTitle">
      <header class="practice-head">
        <div>
          <p class="eyebrow">${mode === "all" ? "Mode entrainement" : "Revision ciblee"}</p>
          <h1 id="practiceTitle">${escapeHtml(targetLabel)}</h1>
          <p class="hero-copy">${getPracticeIntro(mode)}</p>
        </div>
        <div class="course-actions">
          <a class="button primary" href="#/exam">Passer en examen blanc</a>
          <a class="button ghost" href="${mode === "all" ? "#/practice/quick" : "#/practice"}">${mode === "all" ? "Revision rapide" : "Tout l'entrainement"}</a>
        </div>
      </header>
      ${mode !== "all" ? "" : `<form class="practice-filters" aria-label="Filtres d'entrainement">
        <label>
          <span>Domaine</span>
          <select name="domain">
            <option value="">Tous</option>
            ${EXAM_DOMAINS.map((domain) => `<option value="${domain.id}" ${state.practiceFilters.domain === domain.id ? "selected" : ""}>${escapeHtml(domain.label)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>Niveau</span>
          <select name="level">
            <option value="">Tous</option>
            ${[1, 2, 3, 4, 5].map((level) => `<option value="${level}" ${state.practiceFilters.level === String(level) ? "selected" : ""}>Niveau ${level}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>Type</span>
          <select name="type">
            <option value="">Tous</option>
            ${["single", "multiple", "code-output", "code-fix", "match", "order"].map((type) => `<option value="${type}" ${state.practiceFilters.type === type ? "selected" : ""}>${escapeHtml(getTypeLabel(type))}</option>`).join("")}
          </select>
        </label>
        <label class="practice-toggle">
          <input type="checkbox" name="mistakesOnly" ${state.practiceFilters.mistakesOnly ? "checked" : ""} />
          <span>Revoir uniquement mes erreurs (${mistakes.size})</span>
        </label>
      </form>`}
      <div class="practice-count">${questions.length} question${questions.length > 1 ? "s" : ""}</div>
      <div class="practice-list">
        ${questions.length ? questions.map(renderPracticeCard).join("") : `<div class="empty-catalog"><h3>Aucune question</h3><p>${mode === "all" ? "Modifie les filtres ou reviens apres avoir enregistre des erreurs." : "Aucune question ne correspond encore a cette revision ciblee."}</p></div>`}
      </div>
    </section>
  `;

  bindPracticeRoute(bank, mode);
}

function getPracticeQuestions(bank, mistakes, mode, target) {
  if (mode === "quick") return getQuickReviewQuestions(bank, mistakes);
  if (mode === "topic") {
    return bank.filter((question) => questionMatchesTopic(question, target));
  }
  if (mode === "domain") {
    return bank.filter((question) => question.domain === target);
  }
  return getFilteredPracticeQuestions(bank, mistakes);
}

function getPracticeTargetLabel(mode, target) {
  if (mode === "quick") return "Revision rapide";
  if (mode === "topic") return `Revision : ${target ?? "topic"}`;
  if (mode === "domain") return `Revision : ${getDomainLabel(target)}`;
  return "Questions libres";
}

function getPracticeIntro(mode) {
  if (mode === "quick") return "Session courte basee sur tes erreurs et tes domaines les plus fragiles.";
  if (mode === "topic") return "Questions ciblees sur une notion ressortie dans tes erreurs.";
  if (mode === "domain") return "Questions ciblees sur un domaine a consolider.";
  return "Correction immediate, filtres par competence, niveau et type, avec revision ciblee des erreurs.";
}

function questionMatchesTopic(question, target) {
  if (!target) return false;
  const keys = [question.topic, ...(question.references ?? [])].filter(Boolean).map(normalize);
  return keys.includes(target);
}

function getQuickReviewQuestions(bank, mistakes) {
  const result = readJson(EXAM_STORAGE_KEYS.result, null);
  const mistakeQuestions = bank.filter((question) => mistakes.has(question.id));
  const weakDomains = result?.domains
    ? [...result.domains].sort((left, right) => (left.correct / left.total) - (right.correct / right.total)).slice(0, 2).map((domain) => domain.id)
    : [];
  const weakQuestions = bank.filter((question) => weakDomains.includes(question.domain));
  const pool = [...mistakeQuestions, ...weakQuestions, ...bank.filter((question) => question.level >= 3)];
  const unique = [...new Map(pool.map((question) => [question.id, question])).values()];
  return shuffleArray(unique).slice(0, 10);
}

function getFilteredPracticeQuestions(bank, mistakes) {
  return bank.filter((question) => {
    if (state.practiceFilters.domain && question.domain !== state.practiceFilters.domain) return false;
    if (state.practiceFilters.level && String(question.level) !== state.practiceFilters.level) return false;
    if (state.practiceFilters.type && question.type !== state.practiceFilters.type) return false;
    if (state.practiceFilters.mistakesOnly && !mistakes.has(question.id)) return false;
    return true;
  });
}

function renderPracticeCard(question) {
  return `
    <article class="practice-card" data-practice-id="${escapeHtml(question.id)}">
      <div class="tosa-head">
        <span>${escapeHtml(getDomainLabel(question.domain))}</span>
        <small>Niveau ${escapeHtml(question.level)} - ${escapeHtml(getTypeLabel(question.type))}</small>
      </div>
      <h2>${escapeHtml(question.question)}</h2>
      ${renderPracticeBody(question)}
      <div class="tosa-actions">
        <button type="button" data-practice-action="check">Verifier</button>
        <button type="button" data-practice-action="reset">Reinitialiser</button>
      </div>
      <ul class="tosa-checks"></ul>
      <p class="tosa-feedback" aria-live="polite"></p>
    </article>
  `;
}

function renderPracticeBody(question) {
  if (question.type === "code-fix") {
    return `
      <label class="exam-code-fix">
        <span>Zone de reponse</span>
        <textarea spellcheck="false">${escapeHtml(question.code ?? "")}</textarea>
      </label>
    `;
  }

  if (question.type === "match") {
    return `
      <div class="exam-match">
        ${(question.items ?? []).map((item, index) => `
          <label>
            <span>${escapeHtml(item.prompt)}</span>
            <select data-match-index="${index}">
              <option value="">Choisir...</option>
              ${(question.choices ?? []).map((choice) => `<option value="${escapeHtml(choice)}">${escapeHtml(choice)}</option>`).join("")}
            </select>
          </label>
        `).join("")}
      </div>
    `;
  }

  if (question.type === "order") {
    return `
      <div class="exam-order">
        ${(question.options ?? []).map((option, optionIndex) => `
          <label>
            <span>${escapeHtml(option)}</span>
            <select data-order-index="${optionIndex}">
              <option value="">Position...</option>
              ${question.options.map((_item, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}
            </select>
          </label>
        `).join("")}
      </div>
    `;
  }

  const multiple = question.type === "multiple" || (question.answers ?? []).length > 1;
  return `
    ${question.code ? `<pre class="exam-code"><code>${escapeHtml(question.code)}</code></pre>` : ""}
    <fieldset>
      <legend class="sr-only">${escapeHtml(question.question)}</legend>
      <div class="exam-options">
        ${(question.options ?? []).map((option, optionIndex) => `
          <label>
            <input type="${multiple ? "checkbox" : "radio"}" name="practice-${escapeHtml(question.id)}" value="${optionIndex}" />
            <span>${escapeHtml(option)}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function bindPracticeRoute(bank, mode = "all") {
  const byId = new Map(bank.map((question) => [question.id, question]));

  els.content.querySelector(".practice-filters")?.addEventListener("change", (event) => {
      const form = event.currentTarget;
      state.practiceFilters = {
        domain: form.elements.domain.value,
        level: form.elements.level.value,
        type: form.elements.type.value,
        mistakesOnly: form.elements.mistakesOnly.checked
      };
      renderPracticeRoute(mode);
    });

  els.content.querySelectorAll("[data-practice-action='check']").forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest("[data-practice-id]");
      const question = byId.get(card.dataset.practiceId);
      const answer = readPracticeAnswer(card, question);
      button.disabled = true;
      button.textContent = question.type === "code-fix" ? "Test..." : "Verifier";
      const results = question.type === "code-fix" ? await evaluateCodeExercise(answer, question) : [];
      const correct = results.length > 0
        ? results.every((result) => result.pass)
        : isAnswerCorrect(question, answer);
      updatePracticeMistake(question.id, !correct);
      showPracticeFeedback(card, question, answer, correct, results);
      button.disabled = false;
      button.textContent = "Verifier";
    });
  });

  els.content.querySelectorAll("[data-practice-action='reset']").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-practice-id]");
      const question = byId.get(card.dataset.practiceId);
      resetPracticeCard(card, question);
    });
  });
}

function readPracticeAnswer(card, question) {
  if (question.type === "match") {
    return Array.from(card.querySelectorAll("[data-match-index]")).map((select) => select.value);
  }

  if (question.type === "order") {
    return Object.fromEntries(Array.from(card.querySelectorAll("[data-order-index]")).map((select) => [
      select.dataset.orderIndex,
      Number(select.value) || null
    ]));
  }

  if (question.type === "code-fix") {
    return card.querySelector("textarea")?.value ?? "";
  }

  const selected = Array.from(card.querySelectorAll("input:checked")).map((input) => Number(input.value));
  return question.type === "multiple" ? selected : selected[0] ?? null;
}

function showPracticeFeedback(card, question, answer, correct, results = []) {
  renderCodeCheckResults(card, results);
  const feedback = card.querySelector(".tosa-feedback");
  feedback.className = `tosa-feedback ${correct ? "is-success" : "is-error"}`;
  feedback.innerHTML = `
    ${correct ? "Correct." : "A revoir."}
    <span>Correction : ${escapeHtml(formatCorrectAnswer({ ...question, userAnswer: answer }))}</span>
    ${question.explanation ? `<span>${escapeHtml(question.explanation)}</span>` : ""}
  `;
}

function resetPracticeCard(card, question) {
  card.querySelectorAll("input").forEach((input) => {
    input.checked = false;
  });
  card.querySelectorAll("select").forEach((select) => {
    select.value = "";
  });
  if (question.type === "code-fix") {
    card.querySelector("textarea").value = question.code ?? "";
  }
  card.querySelector(".tosa-checks").innerHTML = "";
  const feedback = card.querySelector(".tosa-feedback");
  feedback.className = "tosa-feedback";
  feedback.textContent = "";
}

function readPracticeMistakes() {
  const ids = readJson(EXAM_STORAGE_KEYS.practiceMistakes, []);
  return new Set(Array.isArray(ids) ? ids : []);
}

function updatePracticeMistake(questionId, isMistake) {
  const mistakes = readPracticeMistakes();
  if (isMistake) {
    mistakes.add(questionId);
  } else {
    mistakes.delete(questionId);
  }
  localStorage.setItem(EXAM_STORAGE_KEYS.practiceMistakes, JSON.stringify([...mistakes]));
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
  window.addEventListener("beforeunload", (event) => {
    if (!hasActiveExam()) return;
    event.preventDefault();
    event.returnValue = "";
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
