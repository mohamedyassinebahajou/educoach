import type { Locale } from "@/lib/i18n/config";
import { en, type Dictionary } from "@/lib/i18n/messages/en";
import { fr } from "@/lib/i18n/messages/fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

/** Replace `{key}` placeholders in a template string. */
export function formatMessage(
  template: string,
  vars: Record<string, string | number> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export type { Dictionary };
