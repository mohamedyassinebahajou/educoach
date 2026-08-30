/**
 * After each fenced ```js / ```javascript block, append an MDX <TryIt /> panel
 * so every practical example is runnable on its own.
 *
 * Code is passed as base64 in a plain string attribute so MDX/JSX never has to
 * parse expression braces inside the snippet (which can drop the prop).
 */
export function injectTryItPanels(mdxSource: string): string {
  const fence = /```(js|javascript)[^\n]*\n([\s\S]*?)```/gi;

  return mdxSource.replace(fence, (full, _lang: string, code: string, offset: number) => {
    const after = mdxSource.slice(offset + full.length, offset + full.length + 80);
    if (/^\s*\n\s*<TryIt\b/.test(after)) {
      return full;
    }
    const trimmed = code.replace(/\s+$/, "");
    if (!trimmed.trim()) return full;

    const encoded = Buffer.from(trimmed, "utf8").toString("base64");
    return `${full}\n\n<TryIt encoded="${encoded}" />\n`;
  });
}
