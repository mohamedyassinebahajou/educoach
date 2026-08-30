import type { DayMeta, LessonMeta } from "@/lib/curriculum";
import { curriculum } from "@/lib/curriculum";
import type { Locale } from "@/lib/i18n/config";

const dayFr: Record<string, { title: string; dateLabel?: string }> = {
  "day-01": { title: "Bienvenue & première JavaScript", dateLabel: "Lun 31 août" },
  "day-02": { title: "Variables, opérateurs & conditions", dateLabel: "Mar 1 sep" },
  "day-03": { title: "Boucles", dateLabel: "Mer 2 sep" },
  "day-04": { title: "Fonctions & portée", dateLabel: "Jeu 3 sep" },
  "day-05": { title: "Chaînes de caractères", dateLabel: "Ven 4 sep" },
  "day-06": { title: "Tableaux", dateLabel: "Sam 5 sep" },
  "day-07": { title: "Objets & tableaux d'objets", dateLabel: "Lun 7 sep" },
  "day-08": { title: "Recherche & tri", dateLabel: "Mar 8 sep" },
  "day-09": { title: "Mini-projet SAS", dateLabel: "Mer–Jeu 9–10 sep" },
  "day-10": { title: "Préparation soutenance & révision", dateLabel: "Ven–Sam 11–12 sep" },
};

const lessonFr: Record<string, { title: string; summary: string }> = {
  "welcome-to-javascript": {
    title: "Bienvenue YouCode SAS / JavaScript",
    summary: "Vue d'ensemble — parcours JS de base pour la session SAS.",
  },
  "hello-console": {
    title: "console.log et fichiers .js",
    summary: "Exécuter des instructions, afficher des valeurs (Node ou console navigateur).",
  },
  "git-github-basics": {
    title: "Git & GitHub — bases",
    summary: "Commit et push — esprit du défi Jour 1 (atelier classe).",
  },
  "variables-let-const": {
    title: "Variables et constantes",
    summary: "let, const, nommage, types primitifs, typeof.",
  },
  "operators-arithmetic": {
    title: "Opérateurs",
    summary: "Arithmétique, affectation, ===, opérateurs logiques.",
  },
  "if-else": {
    title: "Conditions — if / else / switch",
    summary: "Branches avec if, else if, else et switch.",
  },
  "for-while-loops": {
    title: "for et while",
    summary: "Répéter avec for et while ; break et continue.",
  },
  "nested-loops": {
    title: "Boucles avec conditions & imbrication",
    summary: "Parcourir avec conditions dans les boucles ; boucles imbriquées.",
  },
  "functions-basics": {
    title: "Fonctions",
    summary: "Paramètres, arguments, return, refactorisation.",
  },
  "arrow-functions-scope": {
    title: "Portée & fonctions fléchées",
    summary: "Portée de bloc, fonctions classiques et fléchées.",
  },
  "string-basics": {
    title: "Chaînes — longueur, index, parcours",
    summary: "Parcourir les caractères ; compter et inspecter le texte.",
  },
  "string-methods": {
    title: "Méthodes essentielles des chaînes",
    summary: "slice, includes, toLowerCase, toUpperCase, trim.",
  },
  "string-challenges": {
    title: "Défis sur les chaînes",
    summary: "Voyelles, occurrences, inversion, palindrome.",
  },
  "arrays-basics": {
    title: "Tableaux — créer, indexer, modifier",
    summary: "length, push/pop, ajouter et retirer des éléments.",
  },
  "array-traversal": {
    title: "Parcours de tableaux — somme, moy, min, max",
    summary: "Boucler pour analyser des listes numériques.",
  },
  "array-challenges": {
    title: "Défis sur les tableaux",
    summary: "Recherche, comptage et inversion.",
  },
  "objects-basics": {
    title: "Objets",
    summary: "Propriétés, valeurs, lecture, mise à jour.",
  },
  "array-of-objects": {
    title: "Tableaux d'objets",
    summary: "Parcourir et chercher des enregistrements.",
  },
  "linear-search": {
    title: "Recherche linéaire (idée binaire)",
    summary: "Trouver une valeur par scan ; prérequis de la recherche binaire.",
  },
  "sorting-basics": {
    title: "Tri à bulles & tri par sélection",
    summary: "Algorithmes de tri simples à la main.",
  },
  "mini-project-brief": {
    title: "Brief mini-projet",
    summary: "Périmètre, JS de base seulement, workflow Git.",
  },
  "mini-project-checkpoints": {
    title: "Jalons du projet",
    summary: "Découper le travail en étapes testables.",
  },
  "core-review": {
    title: "Révision JS de base",
    summary: "Carte des compétences semaines 1–2.",
  },
  "defense-prep": {
    title: "Préparation soutenance",
    summary: "Présenter, démontrer et répondre aux questions.",
  },
};

export function localizeLesson(lesson: LessonMeta, locale: Locale): LessonMeta {
  if (locale === "en") return lesson;
  const fr = lessonFr[lesson.slug];
  return fr ? { ...lesson, title: fr.title, summary: fr.summary } : lesson;
}

export function localizeDay(day: DayMeta, locale: Locale): DayMeta {
  if (locale === "en") return day;
  const fr = dayFr[day.id];
  return {
    ...day,
    title: fr?.title ?? day.title,
    dateLabel: fr?.dateLabel ?? day.dateLabel,
    lessons: day.lessons.map((l) => localizeLesson(l, locale)),
  };
}

export function getLocalizedCurriculum(locale: Locale): DayMeta[] {
  return curriculum.map((d) => localizeDay(d, locale));
}

export function findLocalizedLesson(
  slug: string,
  locale: Locale,
): { day: DayMeta; lesson: LessonMeta } | null {
  for (const day of curriculum) {
    const lesson = day.lessons.find((l) => l.slug === slug);
    if (lesson) {
      return {
        day: localizeDay(day, locale),
        lesson: localizeLesson(lesson, locale),
      };
    }
  }
  return null;
}

export function getLocalizedLessonNav(slug: string, locale: Locale) {
  const published = getLocalizedCurriculum(locale).flatMap((d) => d.lessons);
  const index = published.findIndex((l) => l.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? published[index - 1] : null,
    next: index < published.length - 1 ? published[index + 1] : null,
  };
}

export function getLocalizedContinueLesson(locale: Locale): LessonMeta | null {
  const published = getLocalizedCurriculum(locale).flatMap((d) => d.lessons);
  return published[0] ?? null;
}
