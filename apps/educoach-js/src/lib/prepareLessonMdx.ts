/**
 * Normalize lesson MDX so next-mdx-remote can compile it.
 * - Raw <details> breaks inside list items → use <LessonAnswer>
 * - Numbered exercise lines → bold labels (not <ol>) so answers can follow
 */
export function prepareLessonMdx(source: string): string {
  let out = source;

  out = out.replace(
    /<details>\s*<summary>Answer<\/summary>\s*\n([\s\S]*?)<\/details>/gi,
    (_, inner) => `\n\n<LessonAnswer>\n\n${inner.trim()}\n\n</LessonAnswer>\n\n`,
  );

  // Only under **Exercises:** — turn "1. ..." into bold labels (avoids nested list + JSX issues).
  const exIdx = out.indexOf("**Exercises:**");
  if (exIdx >= 0) {
    const head = out.slice(0, exIdx);
    const tail = out.slice(exIdx);
    out =
      head +
      tail.replace(/^(\d+)\.\s+/gm, (_, n) => `\n\n**${n}.** `);
  }

  return out;
}
