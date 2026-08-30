# EduCoach JS — Guided implementation steps

Follow **one step at a time**. Do not skip ahead unless the previous step works in the browser.

**App path:** `apps/educoach-js`  
**Wireframes:** [`EDUCOACH_JS_SCREENS_AND_WIREFRAMES.md`](EDUCOACH_JS_SCREENS_AND_WIREFRAMES.md)

---

## Stack (locked)

| Piece | Choice |
|-------|--------|
| UI | Next.js (App Router) + TypeScript + Tailwind |
| Lessons | MDX (from Step 2) |
| Try-it / exercises | Browser sandbox (from Step 3 / 5) |
| Auth | Simple roles (Step 6) |
| AI | Wire to API later (Step 8); Python PoC stays untouched for soutenance |

---

## Step 1 — Scaffold + app shell ✅

**Goal:** Runnable app with Home + nav to Learn / Exercises / Progress / Coach placeholders.

**Done when:**
- `npm run dev` opens http://localhost:3000
- Header links work
- Each route shows a clear placeholder

**Commands:**
```bash
cd apps/educoach-js
npm run dev
```

---

## Step 2 — Learn home + curriculum + first MDX lessons ✅

**Goal:** L1 Learn home with Week 1 / Week 2 days; 2–3 real lesson pages from adapted open-tutorial content; sidebar lists lessons.

**Done when:**
- `/learn` lists days and lesson links
- Clicking a lesson opens `/learn/[slug]` with readable content (even without Try-it yet)

**Shipped:**
- Curriculum map in `src/lib/curriculum.ts` (10 days)
- 3 Day 1 MDX lessons in `content/lessons/`
- Sidebar on Learn home + lesson pages
- Prev / Next between published lessons

---

## Step 3 — Lesson page + browser Try-it ✅

**Goal:** L2 full pattern — sidebar + lesson body + Try-it (Run / output) + Prev / Next.

**Done when:** learner can edit a small JS snippet on the page and see console-style output.

**Shipped:**
- `TryItPanel` client component (edit → Run → Output, Reset)
- Starter code via MDX frontmatter `tryIt:`
- Browser sandbox: `console.log` / `info` / `warn` / `error` (no DOM yet — Week 2)

---

## Step 4 — Exercise catalog + detail ✅

**Goal:** E1 + E2 — list exercises by day; detail with statement + link to lesson + Start.

**Done when:**
- `/exercises` lists exercises (filter by day)
- `/exercises/[id]` shows goal, constraints, lesson link, Start

**Shipped:**
- `src/lib/exercises.ts` — 3 Day 1 exercises (E-101 … E-103)
- Catalog with day filter
- Detail page + Start → `/exercises/[id]/solve` stub (real workspace = Step 5)

---

## Step 5 — Solve workspace + in-browser tests ✅

**Goal:** E3 — editor, Run tests, pass/fail, submit attempt (can store in memory/JSON at first).

**Done when:** learner can solve E-101…E-103 with automated checks and see attempt history.

**Shipped:**
- `SolveWorkspace` — editor, Run tests, Submit, Reset, hints ladder
- `gradeExercise` + console sandbox checks
- Attempts in `localStorage` (this browser only, until auth/DB)

---

## Step 6 — Login + roles (NEXT)

---

## Step 6 — Login + roles ✅

**Goal:** A1 — learner vs coach; restrict `/coach`; session persists.

**Done when:**
- Sign in works; coach-only `/coach`; solve requires login
- Attempts saved in SQLite (not only localStorage)

**Shipped:**
- Prisma + SQLite (`prisma/dev.db`) — `User`, `Attempt`, `LessonProgress`
- JWT httpOnly cookie session (`AUTH_SECRET`)
- `/login`, seed users, attempts API
- Middleware: `/coach` = coach role; `/exercises/.../solve` = logged in
- Coach page shows learners + recent attempts from DB

**Demo logins:** `coach` / `coach123` · `student1`…`student5` / `student123`

```bash
cd apps/educoach-js
npm run db:seed
npm run dev
```

---

## Step 7 — Progress + coach board skeleton ✅

**Goal:** P1 + K1/K5 — % docs/exercises; simple at-risk / alerts list from DB.

**Done when:**
- `/progress` shows docs % and exercises % for the logged-in learner
- Opening a lesson marks it complete in `LessonProgress`
- `/coach` shows class table + at-risk flags + alerts

**Shipped:**
- `src/lib/progress.ts` — progress + PoC risk heuristic
- Learner Progress page with bars + checklists
- Coach board: stats, docs%/exercises%, AT-RISK, alerts feed

---

## Step 8 — Tutor / Helper ✅

**Goal:** C1/C2 drawers; ground on lesson MDX; Helper hints-only; keep `reply` ≠ `coach_alert`.

**Done when:**
- Lesson page has **Ask Tutor** drawer grounded on that MDX
- Solve page has **Ask Helper** (hints only, no full solution)
- Learner UI shows `reply` only; coach board can show `coach_alert`

**Shipped:**
- `POST /api/chat` — tutor | helper + silent analyzer
- **Lesson Tutor** → Python FastAPI Concept Tutor + JS Chroma RAG
- **Exercise Helper** → Python FastAPI Code Helper (hints only; exercise + code + failing tests in the prompt)
- Local stubs only if `EDUCOACH_API_FALLBACK=local`
- `ChatDrawer` + Ask Tutor / Ask Helper
- In-memory `coachAlerts` side channel → Coach Alerts (CHAT)

---

## How we work together

1. You say **“do Step N”** (or “next”).
2. I implement only that step.
3. You run the app and confirm.
4. We move on.

**Current:** Step 8 complete — guided path finished. Next: more lessons/exercises, optional LLM, Node runner.
