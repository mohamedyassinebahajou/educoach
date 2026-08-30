---
source: docs/youcode-sas-js-curriculum.md
adapted_for: EduCoach JS RAG
day: 7
---
# Day 07 — Objects & arrays of objects
## Objects

An object is a collection of related data stored as key-value pairs, written between curly braces, like `{ name: "Sara", age: 20 }`. Each key (also called a property name) is connected to a value, and together they describe one "thing" — a person, a product, a car — in a structured way.

You access a property using dot notation, `person.name`, or bracket notation, `person["name"]` — bracket notation is required when the key is stored in a variable or contains spaces/special characters. You can update an existing property by assigning a new value, `person.age = 21`, and you can add a brand-new property the same way, even if it didn't exist before: `person.city = "Rabat"`.

You can also delete a property with the `delete` keyword, though this is used less often than updating. Objects can contain any type of value, including strings, numbers, booleans, arrays, and even other objects (called nested objects), which lets you model more complex real-world data.

Just like arrays, objects declared with `const` can still have their properties changed — `const` only locks the variable itself, not its contents. You can check if a key exists using `"key" in object` or by checking if `object.key !== undefined`.

Objects are the natural next step after arrays: while arrays are great for ordered lists of similar things, objects are great for describing one thing with several different named attributes — and tomorrow we'll combine both into arrays of objects, which is how most real data is actually structured.

### Key terms

- object
- property (key)
- value
- dot notation
- bracket notation
- nested object
- `delete`
- `in` operator

### Examples

### Example 1

```js
let person = { name: "Sara", age: 20, city: "Marrakesh" };
console.log(person.name);   // "Sara"
console.log(person["age"]); // 20
```


### Example 2

```js
let person = { name: "Sara", age: 20 };
person.age = 21;      // update existing property
person.city = "Fes";  // add new property
console.log(person);
```


### Example 3

```js
let car = {
  brand: "Toyota",
  model: "Corolla",
  specs: { year: 2022, color: "blue" } // nested object
};
console.log(car.specs.year); // 2022
```


### Example 4

```js
let key = "name";
let person = { name: "Omar" };
console.log(person[key]); // "Omar", bracket notation with a variable key
```


### Example 5

```js
let product = { title: "Book", price: 50 };
console.log("price" in product); // true
delete product.price;
console.log(product); // { title: "Book" }
```


### Common mistakes

- Using dot notation with a variable key (`person.key` instead of `person[key]`), which looks for a literal property called "key".
- Forgetting that accessing a property that doesn't exist returns `undefined`, not an error.
- Confusing object property order expectations — objects are for named access, not for order-dependent logic like arrays.

### Checkpoints

- Q: How do you access a property called `price` on an object called `product`? A: `product.price` or `product["price"]`.
- Q: When must you use bracket notation instead of dot notation? A: When the key is stored in a variable, or contains spaces/special characters.
- Q: Does using `const` prevent changing an object's properties? A: No, it only prevents reassigning the variable to a different object.

### Practice

Create an object describing yourself (name, age, city, favorite hobby), print each property, then update one property and add a brand-new one.

### Sources

- MDN, "Object basics" — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
- javascript.info, "Objects" — https://javascript.info/object
- YouTube search: "JavaScript objects properties dot notation bracket notation"

---

## Arrays of objects

An array of objects is exactly what it sounds like: a list where each item is an object, which is how most real-world data is represented — a list of students, products, or orders. You access one record by its index first, then its property: `students[0].name` gets the `name` of the first student in the array.

To traverse an array of objects, you use the same `for` loop pattern as before, but inside the loop you work with `arr[i].propertyName` instead of just `arr[i]`. Searching for a specific record means looping through and checking a property against a target value, for example finding the student whose `id` matches a given number, and returning the whole object (or `null`/`undefined` if not found) rather than just a boolean.

You can also compute aggregates across an array of objects, like the total or average of a specific property — for example, the average `age` of all students, or the total `price` of all products — by adapting the sum/average pattern from Day 6 to read `arr[i].price` instead of `arr[i]`.

Filtering an array of objects follows the same manual-filter pattern: loop through, test a property, and push matching objects into a new array, for example "all students older than 18". This combination — arrays holding objects, each object holding named fields — is the shape of almost all realistic data you will work with, including in this bootcamp's mini-project and in any future database or API you'll learn about later.

Practicing comfortable dot-notation access inside a loop (`arr[i].field`) today will make the rest of the bootcamp much smoother.

### Key terms

- array of objects
- record
- `arr[i].property`
- search by property
- aggregate over objects
- manual filter over objects

### Examples

### Example 1

```js
let students = [
  { id: 1, name: "Sara", age: 20 },
  { id: 2, name: "Omar", age: 22 },
  { id: 3, name: "Nadia", age: 19 }
];
console.log(students[0].name); // "Sara"
```


### Example 2

```js
for (let i = 0; i < students.length; i++) {
  console.log(students[i].name, "-", students[i].age);
}
```


### Example 3

```js
function findStudentById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}
console.log(findStudentById(students, 2)); // { id: 2, name: "Omar", age: 22 }
```


### Example 4

```js
function averageAge(list) {
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i].age;
  }
  return sum / list.length;
}
console.log(averageAge(students)); // 20.33...
```


### Example 5

```js
function studentsOlderThan(list, limit) {
  let result = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].age > limit) {
      result.push(list[i]);
    }
  }
  return result;
}
console.log(studentsOlderThan(students, 19));
```


### Common mistakes

- Forgetting the `.property` after the index, e.g. `students[i]` instead of `students[i].age`, and getting the whole object instead of a number.
- Returning `true`/`false` from a search function when the whole record (or `null`) is expected.
- Mutating a record you found through search when you only meant to read its data.

### Checkpoints

- Q: How do you access the `name` of the second item in an array of student objects called `students`? A: `students[1].name`.
- Q: What should a "find by id" function return if no record matches? A: `null` (or `undefined`), not `false` or `-1`.
- Q: What loop pattern do you use to compute the average of a property across an array of objects? A: The sum/average pattern, reading `arr[i].property` instead of `arr[i]`.

### Practice

Build an array of 5 objects representing products (`name`, `price`, `inStock`), then write functions to find a product by name, compute the total price of all products, and list only the products currently in stock.

### Sources

- javascript.info, "Objects" and "Arrays" combined practice — https://javascript.info/object
- MDN, "Working with objects" — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
- YouTube search: "JavaScript array of objects loop find beginner"
