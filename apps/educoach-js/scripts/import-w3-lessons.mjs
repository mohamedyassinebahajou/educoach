/**
 * Import W3Schools-style curriculum markdown → MDX lesson files.
 *
 * Usage (from apps/educoach-js):
 *   node scripts/import-w3-lessons.mjs
 *   node scripts/import-w3-lessons.mjs /path/to/source.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CONCEPT_ENRICHMENT,
  LESSON_INTROS,
} from "./concept-enrichment.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, "..");
const defaultSource = path.join(
  appRoot,
  "../../docs/youcode-sas-js-curriculum-w3-detailed.md",
);
const lessonsDir = path.join(appRoot, "content/lessons");

/** Slug metadata aligned with src/lib/curriculum.ts */
const LESSON_META = {
  "welcome-to-javascript": {
    title: "Welcome to YouCode SAS / JavaScript",
    summary: "Program overview — core JS path for the SAS session.",
    day: 1,
  },
  "hello-console": {
    title: "console.log and .js files",
    summary: "Run statements, print values, think in Node or browser console.",
    day: 1,
  },
  "git-github-basics": {
    title: "Git & GitHub basics",
    summary: "Commit and push mindset for the Day-1 challenge (classroom workshop).",
    day: 1,
  },
  "variables-let-const": {
    title: "Variables and constants",
    summary: "let, const, naming, primitive types, typeof.",
    day: 2,
  },
  "operators-arithmetic": {
    title: "Operators",
    summary: "Arithmetic, assignment, ===, and logical operators.",
    day: 2,
  },
  "if-else": {
    title: "Conditions — if / else / switch",
    summary: "Branch with if, else if, else, and switch.",
    day: 2,
  },
  "for-while-loops": {
    title: "for and while",
    summary: "Repeat with for and while; break and continue.",
    day: 3,
  },
  "nested-loops": {
    title: "Loops with conditions & nesting",
    summary: "Traverse with conditions inside loops; nested loops intro.",
    day: 3,
  },
  "functions-basics": {
    title: "Functions",
    summary: "Parameters, arguments, return, and refactoring.",
    day: 4,
  },
  "arrow-functions-scope": {
    title: "Scope & arrow functions",
    summary: "Block scope, classic functions, and arrows.",
    day: 4,
  },
  "string-basics": {
    title: "Strings — length, index, traversal",
    summary: "Walk characters; count and inspect text.",
    day: 5,
  },
  "string-methods": {
    title: "Essential string methods",
    summary: "slice, includes, toLowerCase, toUpperCase, trim.",
    day: 5,
  },
  "string-challenges": {
    title: "String challenges",
    summary: "Vowels, occurrences, reverse, palindrome patterns.",
    day: 5,
  },
  "arrays-basics": {
    title: "Arrays — create, index, mutate",
    summary: "length, push/pop, add and remove elements.",
    day: 6,
  },
  "array-traversal": {
    title: "Array traversal — sum, avg, min, max",
    summary: "Loop to analyze numeric lists.",
    day: 6,
  },
  "array-challenges": {
    title: "Array challenges",
    summary: "Search, counting, and inversion.",
    day: 6,
  },
  "objects-basics": {
    title: "Objects",
    summary: "Properties, values, access, update.",
    day: 7,
  },
  "array-of-objects": {
    title: "Arrays of objects",
    summary: "Traverse and search lists of records.",
    day: 7,
  },
  "linear-search": {
    title: "Linear search (& binary idea)",
    summary: "Find a value by scanning; know what binary search needs.",
    day: 8,
  },
  "sorting-basics": {
    title: "Bubble sort & selection sort",
    summary: "Simple sorting algorithms by hand.",
    day: 8,
  },
  "mini-project-brief": {
    title: "Mini project brief",
    summary: "Scope, core JS only, Git workflow expectations.",
    day: 9,
  },
  "mini-project-checkpoints": {
    title: "Project checkpoints",
    summary: "Break work into testable milestones.",
    day: 9,
  },
  "core-review": {
    title: "Core JS review",
    summary: "Map of SAS Week 1–2 language skills.",
    day: 10,
  },
  "defense-prep": {
    title: "Soutenance prep",
    summary: "Present, demo, and answer questions.",
    day: 10,
  },
};

function yamlQuote(value) {
  return JSON.stringify(value);
}

const SKIP_CONCEPT_HEADINGS = new Set([
  "More Examples:",
  "Exercises:",
  "Note:",
]);

function encodeConceptIntro({ definition, analogy }) {
  const json = JSON.stringify({ definition, analogy });
  return Buffer.from(json, "utf8").toString("base64");
}

/** Insert definition + analogy blocks before each concept's practical content. */
function enrichWithConceptIntros(body, slug) {
  let out = body;

  const lessonIntro = LESSON_INTROS[slug];
  if (lessonIntro) {
    out = `\n\n**${lessonIntro.title}**\n\n<ConceptIntro encoded="${encodeConceptIntro(lessonIntro)}" />\n\n${out}`;
  }

  const concepts = CONCEPT_ENRICHMENT[slug] || {};

  out = out.replace(/^\*\*([^*\n]+)\*\*\s*$/gm, (match, title) => {
    if (SKIP_CONCEPT_HEADINGS.has(title)) return match;
    const enrich = concepts[title];
    if (!enrich) return match;
    return `${match}\n\n<ConceptIntro encoded="${encodeConceptIntro(enrich)}" />\n`;
  });

  return out;
}

/** Ensure blank lines around HTML details blocks for MDX. */
function normalizeDetails(body) {
  return body
    .replace(/<details>\s*<summary>Answer<\/summary>/gi, "\n\n<LessonAnswer>\n\n")
    .replace(/<\/details>/gi, "\n\n</LessonAnswer>\n\n");
}

/** Break numbered exercise lists so answers are not nested in <ol><li>. */
function formatExerciseLists(body) {
  const exIdx = body.indexOf("**Exercises:**");
  if (exIdx < 0) return body;
  const head = body.slice(0, exIdx);
  const tail = body.slice(exIdx);
  return head + tail.replace(/^(\d+)\.\s+/gm, (_, n) => `\n\n**${n}.** `);
}

function parseLessons(markdown) {
  const parts = markdown.split(/^### /gm);
  const lessons = [];

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const slugEnd = part.indexOf("\n");
    if (slugEnd < 0) continue;
    const slug = part.slice(0, slugEnd).trim();
    let body = part.slice(slugEnd + 1).trim();
    // Drop day separators at the end of the last chunk.
    body = body.replace(/\n---\s*$/, "").trim();
    lessons.push({ slug, body });
  }

  return lessons;
}

function toMdx(slug, body) {
  const meta = LESSON_META[slug];
  if (!meta) {
    throw new Error(`Unknown slug in source: ${slug}`);
  }
  const content = formatExerciseLists(
    normalizeDetails(enrichWithConceptIntros(body, slug)),
  );
  return `---
title: ${yamlQuote(meta.title)}
summary: ${yamlQuote(meta.summary)}
day: ${meta.day}
---

${content}
`;
}

function main() {
  const sourcePath = path.resolve(process.argv[2] || defaultSource);
  if (!fs.existsSync(sourcePath)) {
    console.error("Source not found:", sourcePath);
    process.exit(1);
  }

  const markdown = fs.readFileSync(sourcePath, "utf8");
  const lessons = parseLessons(markdown);

  if (lessons.length === 0) {
    console.error("No lessons parsed — check markdown headings (### slug).");
    process.exit(1);
  }

  fs.mkdirSync(lessonsDir, { recursive: true });
  let jsExamples = 0;

  for (const { slug, body } of lessons) {
    const out = path.join(lessonsDir, `${slug}.mdx`);
    fs.writeFileSync(out, toMdx(slug, body), "utf8");
    jsExamples += (body.match(/```js\n/g) || []).length;
    console.log("Wrote", slug, "—", body.split("\n").length, "lines");
  }

  const expected = Object.keys(LESSON_META).length;
  const missing = Object.keys(LESSON_META).filter(
    (s) => !lessons.some((l) => l.slug === s),
  );

  console.log("\nImported", lessons.length, "lessons,", jsExamples, "js examples total.");
  if (missing.length) {
    console.warn("Missing slugs:", missing.join(", "));
  }
  if (lessons.length < expected) {
    process.exitCode = 1;
  }
}

main();
