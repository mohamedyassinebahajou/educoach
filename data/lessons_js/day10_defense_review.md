---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 10
---
# Day 10 — Defense prep & review
## Core JS review

This is a full recap of everything covered in the bootcamp, organized as a mental map so you can see how each piece connects to the next. We started with the absolute basics: running code with `console.log`, and Git/GitHub as the habit of saving and sharing your work.

Then came variables (`let`/`const`) and primitive types, followed by operators and conditions (`if`/`else`/`switch`), which let programs make decisions. Loops (`for`/`while`, plus `break`/`continue` and nesting) let programs repeat work, and functions (classic and arrow) let you organize that work into small, reusable, named pieces with clear inputs (parameters) and outputs (`return`).

Strings taught you indexing, traversal, and built-in methods, while arrays taught you the same ideas applied to lists of any kind of value, plus mutation with `.push()`/`.pop()`. Objects added named properties to describe a single "thing," and arrays of objects combined both ideas to represent realistic collections of records, like students or products.

In week two, linear search taught you how to look something up by scanning, and bubble/selection sort taught you how to put data in order using nested loops and swaps — both essential algorithmic thinking skills, even beyond JavaScript.

Finally, the mini-project forced you to combine all of these skills into one working, tested, Git-tracked program. When reviewing, try to explain each topic out loud in your own words, and rewrite a couple of small examples entirely from memory (without looking at your notes) to check you've truly internalized them, not just recognized them.

If any topic still feels shaky, that's normal — pick 2-3 to actively practice today rather than passively re-reading everything.

### Key terms

- (recap of all bootcamp key terms) variables
- operators
- conditions
- loops
- functions
- scope
- strings
- arrays
- objects
- arrays of objects
- linear search
- sorting

### Examples

### Example 1

```js
// A compact review combining many concepts in one small script
const numbers = [5, 3, 8, 1, 9, 2];

function findMax(arr) {           // functions + traversal
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

const isEven = (n) => n % 2 === 0; // arrow function + operators

let evens = [];                    // manual filter (arrays)
for (let i = 0; i < numbers.length; i++) {
  if (isEven(numbers[i])) {
    evens.push(numbers[i]);
  }
}

console.log("Max:", findMax(numbers));
console.log("Evens:", evens);
```


### Example 2

```js
// Review: object + search + condition together
const users = [
  { id: 1, name: "Sara", active: true },
  { id: 2, name: "Omar", active: false }
];

function findActiveUser(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].active) {
      return list[i];
    }
  }
  return null;
}

console.log(findActiveUser(users));
```


### Example 3

```js
// Review: sorting recap
function bubbleSort(arr) {
  let result = [...arr];
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }
  return result;
}
console.log(bubbleSort([9, 3, 7, 1]));
```


### Common mistakes

- Re-reading notes passively instead of actively rewriting small examples from memory.
- Skipping review of topics that feel "easy" but haven't actually been tested with fresh examples.
- Cramming everything the night before the defense instead of spacing review across Day 10.

### Checkpoints

- Q: Name the four "shapes" of data covered in this bootcamp. A: Primitive values, strings, arrays, and objects (including arrays of objects).
- Q: What two algorithms did we study for putting data in order? A: Bubble sort and selection sort.
- Q: What algorithm scans an array one item at a time to find a target, working on unsorted data? A: Linear search.

### Practice

Without looking at your notes, write one function from each major topic (a condition, a loop, a function, a string method use, an array traversal, an object access, a search, and a sort) in a single fresh file.

### Sources

- MDN, "JavaScript first steps" + "Building blocks" learning paths (full recap) — https://developer.mozilla.org/en-US/docs/Learn/JavaScript
- javascript.info, full site index for review — https://javascript.info/
- YouTube search: "JavaScript fundamentals review beginner cheat sheet"

---

## Soutenance prep

A "soutenance" (defense) is when you present your mini-project to instructors or peers and explain how it works — this is as much about communication as it is about code. Start by preparing a short spoken introduction: what your project does, in one or two sentences, before touching any code.

Then walk through your code file top to bottom, explaining the purpose of your data structure first (why you chose these fields for your objects), then each function briefly (what it takes in, what it returns, and why it's needed), rather than reading every line aloud.

Always run your demo live rather than just showing static code — running `node yourfile.js` and watching the real `console.log` output builds trust that your code actually works, and it's more engaging than a silent code read-through.

Prepare for likely questions in advance: "Why did you use a `for` loop here instead of something else?", "What happens if the array is empty?", "How does your sort function work, step by step?" — practicing clear, short answers to these out loud (even alone, or with a study partner) makes a huge difference on the day.

If you don't know the answer to a question, it's completely fine to say "I'm not sure, let me think" rather than guessing confidently and being wrong — instructors respect honesty and clear thinking under pressure far more than bluffing.

Keep a short written README in your GitHub repo describing what the project does and how to run it (`node filename.js`), since this is often the first thing a reviewer reads before even opening your code. Time yourself doing a full practice run beforehand, so you know whether you're too short, too long, or just right for your allotted defense slot.

Finally, remember that a small, working, well-explained project always defends better than a big, half-broken one you can't fully explain — clarity and understanding matter more than raw feature count.

### Key terms

- soutenance/defense
- live demo
- README
- anticipated questions
- "I don't know
- let me think" (honest uncertainty)
- practice run/timing

### Examples

### Example 1

```js
// A clear demo script is your best presentation tool — run this live
console.log("=== PROJECT DEMO: Inventory Manager ===");
console.log("1) All products:");
console.log(products);
console.log("2) Search for 'Pen':", findProductByName(products, "Pen"));
console.log("3) Total inventory value:", totalInventoryValue(products));
console.log("4) Products sorted by price:", sortByPrice(products));
```


### Example 2

```text
# README.md example structure
# Inventory Manager (Core JS Mini Project)

## What it does
Tracks a small product inventory: search, total value, and sorting by price.

## How to run
node inventory.js
```


### Example 3

```js
// Practice explaining THIS out loud: what does it do, step by step?
function totalInventoryValue(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i].price * list[i].quantity;
  }
  return total;
}
```


### Common mistakes

- Reading code line by line instead of explaining its purpose and behavior at a higher level.
- Not testing the live demo beforehand, risking an on-the-spot crash in front of the audience.
- Guessing confidently at a question instead of honestly saying you're not sure and reasoning it through.

### Checkpoints

- Q: Why is a live demo better than just showing static code? A: It proves the code actually works and is more engaging for the audience.
- Q: What should you do if you don't know the answer to a defense question? A: Say so honestly, and try to reason through it out loud rather than guessing confidently.
- Q: What should a project README typically include? A: A short description of what the project does and how to run it.

### Practice

Write a README for your mini-project, do one full timed practice run of your presentation and live demo out loud, and write down two questions you think you might be asked, with short prepared answers.

### Sources

- GitHub Docs, "About READMEs" (for writing a clear project README) — https://docs.github.com/en/repositories/managing-your-repository-settings-and-features/customizing-your-repository/about-readmes
- YouTube search: "how to present a coding project to a technical audience beginner"
- YouTube search: "how to explain your code in a technical interview"
