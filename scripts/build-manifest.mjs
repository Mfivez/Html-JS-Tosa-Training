import fs from "node:fs";
import path from "node:path";

const COURSES_DIR = "courses";
const OUT_FILE = "manifest.json";

function prettifyName(name) {
  return name
    .replace(/\.md$/i, "")
    .replace(/^\d+[-_ .]*/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase());
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return {};

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`JSON invalide dans ${filePath}: ${error.message}`);
  }
}

function getChapterTitle(mdPath, fallbackFileName) {
  const content = fs.readFileSync(mdPath, "utf8");
  const h1 = content.match(/^#\s+(.+)$/m);
  return h1 ? h1[1].trim() : prettifyName(fallbackFileName);
}

function isMarkdownChapter(fileName) {
  return fileName.toLowerCase().endsWith(".md") && !fileName.startsWith("_");
}

if (!fs.existsSync(COURSES_DIR)) {
  fs.mkdirSync(COURSES_DIR, { recursive: true });
}

const courses = fs
  .readdirSync(COURSES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
  .map((entry) => {
    const courseId = entry.name;
    const courseDir = path.join(COURSES_DIR, courseId);
    const meta = readJsonIfExists(path.join(courseDir, "course.json"));

    const chapters = fs
      .readdirSync(courseDir)
      .filter(isMarkdownChapter)
      .sort((a, b) => a.localeCompare(b, "fr", { numeric: true, sensitivity: "base" }))
      .map((file, index) => {
        const mdPath = path.join(courseDir, file);

        return {
          id: file.replace(/\.md$/i, ""),
          title: getChapterTitle(mdPath, file),
          file: `${courseDir}/${file}`.replaceAll(path.sep, "/"),
          order: index + 1
        };
      });

    return {
      id: courseId,
      title: meta.title ?? prettifyName(courseId),
      description: meta.description ?? "",
      order: Number.isFinite(Number(meta.order)) ? Number(meta.order) : 999,
      chapters
    };
  })
  .sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title, "fr", { numeric: true, sensitivity: "base" });
  });

const manifest = {
  generatedAt: new Date().toISOString(),
  courses
};

fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`Generated ${OUT_FILE} with ${courses.length} course(s).`);
