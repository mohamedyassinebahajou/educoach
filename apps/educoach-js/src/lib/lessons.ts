import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const lessonsDir = path.join(process.cwd(), "content/lessons");

export type LessonFrontmatter = {
  title: string;
  summary?: string;
  day?: number;
  /** Starter code for the lesson Try-it panel (browser console sandbox). */
  tryIt?: string;
};

export function lessonFileExists(slug: string): boolean {
  return fs.existsSync(path.join(lessonsDir, `${slug}.mdx`));
}

export function getLessonSource(slug: string): {
  frontmatter: LessonFrontmatter;
  content: string;
} {
  const fullPath = path.join(lessonsDir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Lesson not found: ${slug}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as LessonFrontmatter,
    content,
  };
}

export function listLessonSlugs(): string[] {
  if (!fs.existsSync(lessonsDir)) return [];
  return fs
    .readdirSync(lessonsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
