/**
 * YouCode SAS session curriculum (core JS only).
 * Source of truth: docs/YOUCODE_SAS_PROGRAM.md
 */
export type LessonMeta = {
  slug: string;
  title: string;
  summary: string;
};

export type DayMeta = {
  id: string;
  week: 1 | 2;
  day: number;
  /** Calendar label from the SAS schedule */
  dateLabel: string;
  title: string;
  lessons: LessonMeta[];
};

export const curriculum: DayMeta[] = [
  {
    id: "day-01",
    week: 1,
    day: 1,
    dateLabel: "Mon 31 Aug",
    title: "Welcome & first JavaScript",
    lessons: [
      {
        slug: "welcome-to-javascript",
        title: "Welcome to YouCode SAS / JavaScript",
        summary: "Program overview — core JS path for the SAS session.",
      },
      {
        slug: "hello-console",
        title: "console.log and .js files",
        summary: "Run statements, print values, think in Node or browser console.",
      },
      {
        slug: "git-github-basics",
        title: "Git & GitHub basics",
        summary: "Commit and push mindset for the Day-1 challenge (classroom workshop).",
      },
    ],
  },
  {
    id: "day-02",
    week: 1,
    day: 2,
    dateLabel: "Tue 1 Sep",
    title: "Variables, operators & conditions",
    lessons: [
      {
        slug: "variables-let-const",
        title: "Variables and constants",
        summary: "let, const, naming, primitive types, typeof.",
      },
      {
        slug: "operators-arithmetic",
        title: "Operators",
        summary: "Arithmetic, assignment, ===, and logical operators.",
      },
      {
        slug: "if-else",
        title: "Conditions — if / else / switch",
        summary: "Branch with if, else if, else, and switch.",
      },
    ],
  },
  {
    id: "day-03",
    week: 1,
    day: 3,
    dateLabel: "Wed 2 Sep",
    title: "Loops",
    lessons: [
      {
        slug: "for-while-loops",
        title: "for and while",
        summary: "Repeat with for and while; break and continue.",
      },
      {
        slug: "nested-loops",
        title: "Loops with conditions & nesting",
        summary: "Traverse with conditions inside loops; nested loops intro.",
      },
    ],
  },
  {
    id: "day-04",
    week: 1,
    day: 4,
    dateLabel: "Thu 3 Sep",
    title: "Functions & scope",
    lessons: [
      {
        slug: "functions-basics",
        title: "Functions",
        summary: "Parameters, arguments, return, and refactoring.",
      },
      {
        slug: "arrow-functions-scope",
        title: "Scope & arrow functions",
        summary: "Block scope, classic functions, and arrows.",
      },
    ],
  },
  {
    id: "day-05",
    week: 1,
    day: 5,
    dateLabel: "Fri 4 Sep",
    title: "Strings",
    lessons: [
      {
        slug: "string-basics",
        title: "Strings — length, index, traversal",
        summary: "Walk characters; count and inspect text.",
      },
      {
        slug: "string-methods",
        title: "Essential string methods",
        summary: "slice, includes, toLowerCase, toUpperCase, trim.",
      },
      {
        slug: "string-challenges",
        title: "String challenges",
        summary: "Vowels, occurrences, reverse, palindrome patterns.",
      },
    ],
  },
  {
    id: "day-06",
    week: 1,
    day: 6,
    dateLabel: "Sat 5 Sep",
    title: "Arrays",
    lessons: [
      {
        slug: "arrays-basics",
        title: "Arrays — create, index, mutate",
        summary: "length, push/pop, add and remove elements.",
      },
      {
        slug: "array-traversal",
        title: "Array traversal — sum, avg, min, max",
        summary: "Loop to analyze numeric lists.",
      },
      {
        slug: "array-challenges",
        title: "Array challenges",
        summary: "Search, counting, and inversion.",
      },
    ],
  },
  {
    id: "day-07",
    week: 2,
    day: 7,
    dateLabel: "Mon 7 Sep",
    title: "Objects & arrays of objects",
    lessons: [
      {
        slug: "objects-basics",
        title: "Objects",
        summary: "Properties, values, access, update.",
      },
      {
        slug: "array-of-objects",
        title: "Arrays of objects",
        summary: "Traverse and search lists of records.",
      },
    ],
  },
  {
    id: "day-08",
    week: 2,
    day: 8,
    dateLabel: "Tue 8 Sep",
    title: "Search & sorting",
    lessons: [
      {
        slug: "linear-search",
        title: "Linear search (& binary idea)",
        summary: "Find a value by scanning; know what binary search needs.",
      },
      {
        slug: "sorting-basics",
        title: "Bubble sort & selection sort",
        summary: "Simple sorting algorithms by hand.",
      },
    ],
  },
  {
    id: "day-09",
    week: 2,
    day: 9,
    dateLabel: "Wed–Thu 9–10 Sep",
    title: "Mini project SAS",
    lessons: [
      {
        slug: "mini-project-brief",
        title: "Mini project brief",
        summary: "Scope, core JS only, Git workflow expectations.",
      },
      {
        slug: "mini-project-checkpoints",
        title: "Project checkpoints",
        summary: "Break work into testable milestones.",
      },
    ],
  },
  {
    id: "day-10",
    week: 2,
    day: 10,
    dateLabel: "Fri–Sat 11–12 Sep",
    title: "Defense prep & review",
    lessons: [
      {
        slug: "core-review",
        title: "Core JS review",
        summary: "Map of SAS Week 1–2 language skills.",
      },
      {
        slug: "defense-prep",
        title: "Soutenance prep",
        summary: "Present, demo, and answer questions.",
      },
    ],
  },
];

export function getDaysByWeek(week: 1 | 2) {
  return curriculum.filter((d) => d.week === week);
}

export function getAllLessons(): LessonMeta[] {
  return curriculum.flatMap((d) => d.lessons);
}

export function findLesson(slug: string): { day: DayMeta; lesson: LessonMeta } | null {
  for (const day of curriculum) {
    const lesson = day.lessons.find((l) => l.slug === slug);
    if (lesson) {
      return { day, lesson };
    }
  }
  return null;
}

export function getLessonNav(slug: string) {
  const published = getAllLessons();
  const index = published.findIndex((l) => l.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? published[index - 1] : null,
    next: index < published.length - 1 ? published[index + 1] : null,
  };
}

export function getContinueLesson(): LessonMeta | null {
  const published = getAllLessons();
  return published[0] ?? null;
}
