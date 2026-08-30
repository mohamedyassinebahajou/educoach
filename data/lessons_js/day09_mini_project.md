---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 9
---
# Day 09 — Mini project SAS
## Mini project brief

The mini-project is your chance to combine everything from the past eight days into one working Core JS program, without using any forbidden features (still no DOM, fetch, classes, or async). A good project idea for this level is a simple console-based data manager: for example, a "student grade manager" or "small inventory tracker" that stores an array of objects, and lets you search, filter, sort, and compute statistics (sum, average, min, max) on that data using only functions you write yourself.

The scope should be realistic for roughly a day and a half of work: aim for 5-8 small functions rather than one giant program, and get each function fully working and tested with `console.log` before moving to the next. Structure your project as a single `.js` file (or a few files if your instructor allows splitting), with a clear top section defining your sample data (an array of objects), followed by your functions, and a bottom section that calls your functions and logs the results — this bottom section acts as your "demo script" for the defense on Day 10.

You must use Git throughout: commit after each function works, with clear messages like "add search by name function", so your GitHub history shows your progress over the two days, not just one final commit. Re-use the patterns you've already practiced: linear search for "find by property", the sum/average/min/max pattern for statistics, and bubble or selection sort for ordering your records by some field (like sorting products by price).

Keep your console output readable: use clear `console.log` labels like `console.log("Average price:", avg)` rather than printing bare numbers, so anyone reviewing your output understands it immediately. Ask your instructor for help early if you get stuck on scope or a bug — the goal is a small, working, well-tested project, not a huge, half-finished one.

### Key terms

- project scope
- sample data (array of objects)
- demo script
- Git commit history
- readable console output

### Examples

### Example 1

```js
// Example starting shape for a "product inventory" mini project
const products = [
  { name: "Notebook", price: 15, quantity: 40 },
  { name: "Pen", price: 3, quantity: 150 },
  { name: "Backpack", price: 90, quantity: 8 }
];

function findProductByName(list, name) { /* ...linear search... */ }
function totalInventoryValue(list) { /* ...sum of price * quantity... */ }
function sortByPrice(list) { /* ...bubble or selection sort by price... */ }

// Demo section at the bottom of the file
console.log(findProductByName(products, "Pen"));
console.log("Total value:", totalInventoryValue(products));
console.log(sortByPrice(products));
```


### Example 2

```js
// Good console output labeling habit
console.log("--- Search result ---");
console.log(findProductByName(products, "Backpack"));
console.log("--- Sorted by price ---");
console.log(sortByPrice(products));
```


### Example 3

```text
git add .
git commit -m "add totalInventoryValue function with tests"
git push
```


### Common mistakes

- Choosing a project scope that's too large (e.g. trying to build a full store simulation) and running out of time.
- Writing all the code first and testing at the very end, instead of testing each function as you finish it.
- Committing only once at the very end, losing the benefit of a clear progress history.

### Checkpoints

- Q: What is the recommended number of functions for the mini-project? A: Roughly 5-8 small, well-tested functions.
- Q: Why should you commit after each function works, rather than once at the end? A: To show clear progress in your Git history and avoid losing work.
- Q: What forbidden features must the mini-project still avoid? A: DOM, HTML/CSS, events, fetch/AJAX, classes, async/await, and other items outside Core JS.

### Practice

Write your project's sample data (array of at least 5 objects) and a one-paragraph plan listing the functions you intend to build, before writing any function logic.

### Sources

- MDN, "Building blocks" learning path recap — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks
- javascript.info full index (for review while building) — https://javascript.info/
- YouTube search: "beginner JavaScript project ideas console app"

---

## Project checkpoints

Breaking your mini-project into checkpoints makes it much less overwhelming and gives you clear, testable proof of progress at each stage. Checkpoint 1 is your data setup: define your array of objects with realistic sample values, and confirm with `console.log` that it looks correct before writing any logic that depends on it.

Checkpoint 2 is your "read" functions: things that look at the data without changing it, like finding a record, filtering by a condition, or computing a statistic (sum/average/min/max) — test each one individually with at least two different inputs.

Checkpoint 3 is your "search and sort" functions: implement linear search for at least one lookup, and bubble or selection sort for at least one ordering, and confirm the output is correctly ordered by printing it. Checkpoint 4 is your "demo script": a clean section at the bottom of your file that calls every function you wrote, in a logical order, with labeled `console.log` output that would make sense to someone seeing it for the first time.

Checkpoint 5 is your Git history: confirm you have several small, clearly-labeled commits pushed to GitHub, not just one big commit — this is often checked separately from the code itself. At each checkpoint, ask yourself: "If I ran this file right now, would everything print correctly with no errors?" — if not, fix it before moving to the next checkpoint, rather than stacking new code on top of broken code.

Treat each checkpoint like a mini save point: once it works, commit it, so you can always return to a known-good state if something breaks later. By the end of Day 9, you should be able to run your whole file from top to bottom with `node` and see a clean, complete demo output with no errors.

### Key terms

- milestone/checkpoint
- read function vs. mutating function
- demo script
- "known-good state"
- incremental testing

### Examples

### Example 1

```js
// Checkpoint 1: data setup, verify visually
console.log("Sample data:", products);
```


### Example 2

```js
// Checkpoint 2: read functions, tested individually
console.log(findProductByName(products, "Pen"));   // should return the Pen object
console.log(findProductByName(products, "Chair")); // should return null (not found)
```


### Example 3

```js
// Checkpoint 3: search & sort, verify order is correct
let sorted = sortByPrice(products);
console.log(sorted.map ? sorted : sorted); // check ascending price order visually
```


### Example 4

```js
// Checkpoint 4: full demo script at the bottom of the file
console.log("=== MINI PROJECT DEMO ===");
console.log("All products:", products);
console.log("Find 'Pen':", findProductByName(products, "Pen"));
console.log("Total value:", totalInventoryValue(products));
console.log("Sorted by price:", sortByPrice(products));
```


### Common mistakes

- Moving to the next checkpoint while the current one still has bugs or untested cases.
- Writing a demo script that only shows the "happy path" and never tests a not-found or empty-input case.
- Losing track of which checkpoint corresponds to which Git commit, making it hard to show progress at the defense.

### Checkpoints

- Q: What should Checkpoint 1 verify before you write any logic? A: That your sample array of objects looks correct when printed.
- Q: What is a "demo script"? A: A clean section of code that calls every function in a logical order with labeled output, used to showcase the project.
- Q: Why commit after each checkpoint rather than only at the very end? A: So you always have a known-good state to return to, and your Git history shows real progress.

### Practice

List your own 4-5 checkpoints for your specific project idea, and commit your code right now at whatever checkpoint you've currently reached.

### Sources

- GitHub Docs, "About issues" (for tracking milestones, optional) — https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
- javascript.info, general reference for debugging while building — https://javascript.info/debugging-chrome
- YouTube search: "how to plan and test a small coding project step by step"
