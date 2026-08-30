---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 1
---
# Day 01 — Welcome & first JavaScript
## Welcome to YouCode SAS / JavaScript

Welcome to the JavaScript bootcamp. Over the next two weeks you will learn Core JavaScript, the part of the language that works everywhere: in a browser, in Node.js, or in a simple script file. JavaScript was created to make web pages interactive, but the language itself is just a tool for giving instructions to a computer, one line at a time.

In this bootcamp we will not touch web pages, buttons, or forms. Instead we focus on the building blocks: values, variables, decisions, loops, functions, strings, arrays, and objects. These building blocks exist in almost every programming language, so what you learn here will transfer to Python, Java, or any other language later.

Think of JavaScript as a very literal assistant: it does exactly what you type, nothing more and nothing less, so precision matters. Every day builds on the previous one, so it's important not to skip lessons. By the end of week one you will be comfortable writing small programs with loops and functions.

By the end of week two you will search and sort data, and build a small project entirely in Core JS. We will also use Git and GitHub daily, because saving and sharing your work is as important as writing it. Don't worry about memorizing everything today — programming is learned by typing code yourself, making mistakes, and fixing them.

### Key terms

- program
- script
- interpreter
- Core JavaScript
- browser console
- Node.js
- bootcamp roadmap

### Examples

### Example 1

```js
// Your very first JavaScript statement
console.log("Welcome to YouCode SAS!");
```


### Example 2

```js
// JavaScript can do math instantly
console.log(2 + 2);
console.log(10 * 4);
```


### Example 3

```js
// JavaScript can combine text (this is called concatenation)
console.log("Hello, " + "world!");
```


### Example 4

```js
// A comment: this line is ignored by JavaScript, it's a note for humans
// console.log("this will not run");
console.log("this will run");
```


### Common mistakes

- Thinking JavaScript is the same as Java (they are unrelated languages, only the name is similar).
- Forgetting that JavaScript is case-sensitive: `Console.log` is not the same as `console.log`.
- Trying to run code in a text file without any way to execute it (you need Node, a browser console, or an online sandbox).

### Checkpoints

- Q: Is JavaScript the same language as Java? A: No, they are completely different languages that only share part of their name.
- Q: What function do we use to print something to the console? A: `console.log()`.
- Q: What track are we following in this bootcamp? A: Core JavaScript only — no DOM, browser APIs, or frameworks.

### Practice

Open a console (browser DevTools or Node) and print your name, your age, and a short sentence about why you're learning to code, each with a separate `console.log`.

### Sources

- MDN, "JavaScript basics" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
- javascript.info, "An Introduction to JavaScript" — https://javascript.info/intro
- YouTube search: "JavaScript full course for beginners 2024"
- YouTube search: "what can you build with JavaScript"

---

## console.log and .js files

`console.log()` is the single most useful tool you will use in this bootcamp: it prints a value so you can see what your code is doing. You can print numbers, text (called strings), true/false values, or several things at once separated by commas.

A JavaScript file is simply a text file saved with the `.js` extension, for example `day1.js`. If you have Node.js installed, you run it by typing `node day1.js` in a terminal, in the same folder as the file. If you don't have Node installed, you can open your browser, press F12 (or right-click → Inspect), go to the "Console" tab, and type statements directly — this is called a REPL, meaning it reads, runs, and prints each line immediately.

Every JavaScript statement usually ends with a semicolon `;`, though JavaScript can often guess where a statement ends without one; we will use semicolons consistently to build a good habit. Statements run from top to bottom, in order, unless we tell the program to do otherwise (which we'll learn with loops and functions).

Getting comfortable running code and reading `console.log` output is the foundation for debugging every program you will ever write. When something looks wrong, the first fix is almost always: add more `console.log` statements to see what's actually happening inside your program.

### Key terms

- console.log
- `.js` file
- terminal
- Node.js
- REPL
- statement
- semicolon
- comment

### Examples

### Example 1

```js
console.log("Hello, YouCode!");
console.log(42);
console.log(true);
```


### Example 2

```js
// You can log multiple values in one call
console.log("Sum:", 2 + 3);
```


### Example 3

```js
// Order matters: statements run top to bottom
console.log("first");
console.log("second");
console.log("third");
```


### Example 4

```js
// A single-line comment starts with //
// This next line does nothing visible, it's just a note
console.log("code after a comment still runs");
```


### Common mistakes

- Forgetting to save the `.js` file before running it in the terminal.
- Running `node` from the wrong folder, so it can't find the file (use `cd` to move into the correct folder first).
- Mixing up `console.log` with `console.log()` — forgetting the parentheses, which will cause an error.

### Checkpoints

- Q: What file extension do JavaScript files use? A: `.js`.
- Q: What terminal command runs a file called `app.js` with Node? A: `node app.js`.
- Q: What is the purpose of `console.log`? A: To print a value so the programmer can see it while the program runs.

### Practice

Create a file `hello.js`, print three different values (a string, a number, a boolean) each on its own line, and run it with Node or paste it in a browser console.

### Sources

- MDN, "What went wrong? Troubleshooting JavaScript" (console section) — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
- javascript.info, "Code editors" and "Developer console" — https://javascript.info/devtools
- Node.js docs, "console.log" — https://nodejs.org/api/console.html#consolelogdata-args
- YouTube search: "how to run JavaScript file with Node.js beginner"

---

## Git & GitHub basics

Git is a tool that saves snapshots of your code over time, called commits, so you never lose your work and can always go back to an earlier version. GitHub is a website that hosts your Git projects online so you can back them up and share them with instructors or teammates.

Think of a commit as a save point in a video game: you make some changes, then you "commit" them with a short message describing what you did. The everyday workflow is: edit your files, `git add` the files you want to save (this stages them), `git commit -m "message"` to save a snapshot, and `git push` to send it to GitHub.

A "repository" (or "repo") is simply the folder that Git is tracking. Before you can push, you usually `git clone` a repo (download it) or `git init` (start tracking a new folder). It's good practice to commit often, with small, clear messages like "add loop exercises" rather than one giant commit at the end of the week.

Throughout the bootcamp you will commit your daily exercises and push them so instructors can review your progress and give feedback. Mistakes in Git are recoverable almost all the time, so don't be afraid to experiment — but always ask before force-pushing or deleting branches you're unsure about.

This lesson is a hands-on workshop: you will set up a GitHub account (if you don't have one), configure Git locally, and push your first commit today.

### Key terms

- repository (repo)
- commit
- stage (`git add`)
- push
- pull
- clone
- branch
- `.gitignore`

### Examples

### Example 1

```text
git init
git add .
git commit -m "first commit: hello.js"
```


### Example 2

```text
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```


### Example 3

```text
git status
git log --oneline
```


### Example 4

```text
git pull origin main
```


### Common mistakes

- Forgetting `git add` before `git commit` (nothing gets staged, so the commit is empty).
- Writing vague commit messages like "update" or "fix" instead of describing what changed.
- Committing large unrelated files (like `node_modules`) — use a `.gitignore` file to exclude them.

### Checkpoints

- Q: What command saves a snapshot of staged changes with a message? A: `git commit -m "message"`.
- Q: What command uploads your commits to GitHub? A: `git push`.
- Q: What is a repository? A: A folder that Git is tracking the history of.

### Practice

Create a GitHub repository for your bootcamp exercises, clone it locally, add today's `hello.js` file, commit it, and push it.

### Sources

- GitHub Docs, "Hello World" guide — https://docs.github.com/en/get-started/quickstart/hello-world
- Git docs, "Git Basics" — https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- YouTube search: "Git and GitHub for beginners crash course"
- YouTube search: "git add commit push explained simply"
