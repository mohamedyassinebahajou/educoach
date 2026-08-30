import { getLessonSource, lessonFileExists } from "@/lib/lessons";

export type LessonChunk = {
  lessonSlug: string;
  lessonTitle: string;
  heading: string;
  text: string;
  score: number;
};

/** Split lesson MDX body into heading-aware chunks for lightweight retrieval. */
export function chunkLesson(slug: string): Omit<LessonChunk, "score">[] {
  if (!lessonFileExists(slug)) return [];
  const { frontmatter, content } = getLessonSource(slug);
  const title = frontmatter.title ?? slug;
  const parts = content.split(/\n(?=##\s)/);
  const chunks: Omit<LessonChunk, "score">[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const headingMatch = trimmed.match(/^##\s+(.+)$/m);
    const heading = headingMatch?.[1]?.trim() ?? "Overview";
    const text = trimmed
      .replace(/^##\s+.+$/m, "")
      .replace(/```[\s\S]*?```/g, (block) => block.slice(0, 280))
      .replace(/\|[^\n]+\|/g, " ")
      .replace(/[*_`#>-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length < 20) continue;
    chunks.push({
      lessonSlug: slug,
      lessonTitle: title,
      heading,
      text: text.slice(0, 600),
    });
  }

  if (chunks.length === 0) {
    const plain = content.replace(/```[\s\S]*?```/g, " ").replace(/\s+/g, " ").trim();
    chunks.push({
      lessonSlug: slug,
      lessonTitle: title,
      heading: "Overview",
      text: plain.slice(0, 600),
    });
  }

  return chunks;
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9$_\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/** Top-k chunks from a lesson (or list of slugs) by simple keyword overlap. */
export function retrieveLessonContext(
  question: string,
  lessonSlugs: string[],
  k = 3,
): LessonChunk[] {
  const tokens = tokenize(question);
  const all = lessonSlugs.flatMap((slug) => chunkLesson(slug));
  const scored: LessonChunk[] = all.map((c) => {
    const hay = `${c.heading} ${c.text}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (hay.includes(t)) score += t.length > 4 ? 2 : 1;
    }
    if (tokens.some((t) => c.heading.toLowerCase().includes(t))) score += 3;
    return { ...c, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((c) => c.score > 0).slice(0, k);
  if (top.length > 0) return top;
  // Fallback: first chunks of primary lesson so Tutor always has grounding.
  return scored.slice(0, Math.min(k, scored.length)).map((c) => ({ ...c, score: 0 }));
}

export function formatContext(chunks: LessonChunk[]): string {
  return chunks
    .map(
      (c) =>
        `[Lesson: ${c.lessonTitle} · ${c.heading}]\n${c.text}`,
    )
    .join("\n\n");
}
