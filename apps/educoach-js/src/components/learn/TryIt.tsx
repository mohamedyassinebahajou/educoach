"use client";

import { TryItPanel } from "@/components/learn/TryItPanel";

type TryItProps = {
  /** Base64-encoded starter source (preferred — safe for MDX attributes). */
  encoded?: string;
  /** Plain starter source (optional fallback). */
  code?: string;
  title?: string;
};

function decodeSnippet(encoded: string): string {
  try {
    // atob is available in browser and modern Node (Next client + RSC boundary).
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return "";
  }
}

/** MDX tag: <TryIt encoded="..." /> — one sandbox per practical example. */
export function TryIt({
  encoded,
  code,
  title = "Try it yourself",
}: TryItProps) {
  const initialCode =
    (typeof encoded === "string" && encoded.length > 0
      ? decodeSnippet(encoded)
      : null) ??
    (typeof code === "string" ? code : "") ??
    "";

  return (
    <div className="not-prose my-4">
      <TryItPanel initialCode={initialCode} title={title} compact />
    </div>
  );
}
