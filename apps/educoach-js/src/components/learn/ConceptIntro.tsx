type ConceptPayload = {
  definition: string;
  analogy: string;
};

function decodePayload(encoded: string): ConceptPayload | null {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = new TextDecoder("utf-8").decode(bytes);
    const data = JSON.parse(json) as ConceptPayload;
    if (typeof data.definition !== "string" || typeof data.analogy !== "string") {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

type ConceptIntroProps = {
  /** Base64-encoded JSON `{ definition, analogy }` — safe for MDX attributes. */
  encoded: string;
};

/** Theory block before the practical lesson content for each concept. */
export function ConceptIntro({ encoded }: ConceptIntroProps) {
  const payload = decodePayload(encoded);
  if (!payload) return null;

  return (
    <div className="not-prose my-3 space-y-3 text-[1.05rem] leading-[1.7] text-[var(--ink)]">
      <p>{payload.definition}</p>
      <p>{payload.analogy}</p>
    </div>
  );
}
