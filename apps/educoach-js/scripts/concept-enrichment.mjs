/** General theory block at the top of a lesson, before JS-specific sections. */
export const LESSON_INTROS = {
  "variables-let-const": {
    title: "What is a variable?",
    definition:
      "A variable is a named place in your program where you store a value so you can read or change it later. Instead of repeating the same number or text everywhere, you give the value one clear name and use that name whenever you need it.",
    analogy:
      "A variable is like a labeled locker: you put your bag inside once, write the locker number on a slip of paper, and later you find the bag by reading the number instead of searching every locker by hand.",
  },
};

export const CONCEPT_ENRICHMENT = {
  "welcome-to-javascript": {
    "What is JavaScript?": {
      definition:
        "JavaScript is a programming language that gives the computer step-by-step instructions to follow. You write lines of code, and the computer runs them in order to produce results such as numbers, text, or decisions.",
      analogy:
        "JavaScript is like a recipe written for a robot chef: each line tells the robot exactly what to do next, and the final dish is the output you see in the console.",
    },
    "JavaScript vs Java": {
      definition:
        "JavaScript and Java are different languages with different designs, even though their names sound similar. JavaScript is mainly used for web interactivity and lightweight scripting, while Java is often used for larger standalone applications.",
      analogy:
        "Sharing part of a name does not make them the same, just as a car key and a house key both say 'key' but open different doors.",
    },
    'What "Core JavaScript" means': {
      definition:
        "Core JavaScript refers to the fundamental language features—variables, types, control flow, functions, strings, arrays, and objects—without relying on frameworks or libraries. Mastering these basics lets you read and write most beginner and intermediate programs.",
      analogy:
        "Core JavaScript is like learning to cook with basic ingredients and techniques before using fancy gadgets; the fundamentals work everywhere.",
    },
    "How the SAS training is organized": {
      definition:
        "The SAS training is structured as a sequence of lessons that build on each other, from running your first line of code through data structures, search, sort, and a mini-project. Each lesson introduces concepts, shows examples, and gives you exercises to practice before moving on.",
      analogy:
        "It is like a hiking trail with marked checkpoints: each stage prepares you for the next, and you cannot skip the map without getting lost later.",
    },
  },

  "hello-console": {
    "What is console.log()?": {
      definition:
        "console.log() is a built-in function that prints a value to the console so you can see what your program is doing. Developers use it to inspect variables, debug logic, and confirm that code runs as expected.",
      analogy:
        "console.log() is like talking to yourself while cooking—you announce each step so you can tell whether things are going right.",
    },
    "Printing different types": {
      definition:
        "JavaScript can print many kinds of values with console.log(), including numbers, strings, booleans, and more complex values like arrays and objects. The console displays each type in a readable form so you can study the output.",
      analogy:
        "Printing different types is like labeling boxes on a shelf: numbers, words, and yes/no tags all look different, but each label tells you what is inside.",
    },
    "Running a `.js` file": {
      definition:
        "A .js file holds JavaScript code that you execute with a runtime such as Node.js from the terminal. The runtime reads the file from top to bottom and runs each statement in order.",
      analogy:
        "Running a .js file is like pressing play on a recipe video—the steps happen one after another exactly as written.",
    },
    "Using a browser console instead": {
      definition:
        "Browsers provide a developer console where you can type JavaScript and see results immediately without saving a file. It is useful for quick experiments and for testing code that interacts with a web page.",
      analogy:
        "The browser console is like a scratch pad on your desk: jot a quick calculation or idea and erase it when you are done experimenting.",
    },
    "Statements run top to bottom": {
      definition:
        "By default, JavaScript executes statements in the order they appear, from the first line to the last. Later lines can use results produced by earlier lines because execution flows downward through the file.",
      analogy:
        "Statements running top to bottom is like following a morning routine: you cannot brush your teeth before you wake up, because order matters.",
    },
  },

  "git-github-basics": {
    "What is Git?": {
      definition:
        "Git is a version control system that records snapshots of your project over time so you can track changes and go back to earlier versions. It runs on your computer and helps you work safely even when files change often.",
      analogy:
        "Git is like a time machine for your project folder: each save creates a moment you can revisit if something breaks.",
    },
    "What is GitHub?": {
      definition:
        "GitHub is an online platform that hosts Git repositories so you can store, share, and collaborate on code in the cloud. It connects to Git on your machine through commands like push and pull.",
      analogy:
        "GitHub is like cloud storage for your recipe book—you keep a copy at home (Git) and a backup online that others can see or contribute to.",
    },
    "Staging with git add": {
      definition:
        "git add selects specific changed files and prepares them for the next commit without saving the snapshot yet. Staging lets you choose exactly which changes belong together in one recorded version.",
      analogy:
        "git add is like placing items on a checkout counter—you decide what goes into this purchase before you pay.",
    },
    "Saving a snapshot with git commit": {
      definition:
        "git commit records a permanent snapshot of everything you staged, along with a message describing the change. Each commit gets a unique identifier so you can reference or restore that exact state later.",
      analogy:
        "A commit is like taking a dated photo of your room—you capture how it looked at that moment and can compare it to photos from other days.",
    },
    "Uploading with git push": {
      definition:
        "git push sends your local commits to a remote repository such as GitHub so others can access your latest work. It updates the online copy to match the history you built on your machine.",
      analogy:
        "git push is like mailing your finished homework to the teacher—the work leaves your desk and arrives where it can be graded or shared.",
    },
  },

  "variables-let-const": {
    "Declaring with let": {
      definition:
        "When a value may change while the program runs, you need a changeable variable—a name you are allowed to update after you first store something in it.",
      analogy:
        "A changeable variable is like a reusable name tag you can peel off and write on again when someone's role changes at an event.",
    },
    "Declaring with const": {
      definition:
        "When a value should stay the same for the whole program, you use a constant—a name that keeps one fixed value and must not be replaced with a different one.",
      analogy:
        "A constant is like engraving your house number on a plaque—it stays fixed even if you repaint the door.",
    },
    "Naming rules": {
      definition:
        "JavaScript variable names must start with a letter, underscore, or dollar sign, and can contain letters, digits, underscores, and dollar signs after the first character. Names are case-sensitive, and reserved words cannot be used as identifiers.",
      analogy:
        "Naming rules are like street-address rules: you need a valid format so the mail system knows where to deliver, and 'Main St' is not the same as 'main st'.",
    },
    "Primitive types": {
      definition:
        "Primitive types are the basic single values in JavaScript: string, number, boolean, undefined, null, bigint, and symbol. They are stored as simple values rather than collections of properties.",
      analogy:
        "Primitive types are like individual LEGO bricks—each is one simple piece, not a whole built model.",
    },
    "undefined vs a value": {
      definition:
        "undefined means a variable has been declared but not yet assigned a value, or a function returned nothing explicitly. A value is any concrete data—such as 0, \"hello\", or false—that the variable or expression holds.",
      analogy:
        "undefined is an empty glass waiting to be filled; a value is the drink actually poured into it.",
    },
  },

  "operators-arithmetic": {
    "Arithmetic operators": {
      definition:
        "Arithmetic operators perform math on numbers: + adds, - subtracts, * multiplies, / divides, and % gives the remainder after division. They follow familiar school math rules with standard precedence.",
      analogy:
        "Arithmetic operators are like buttons on a calculator—each button performs one math action on the numbers you enter.",
    },
    "Assignment operators": {
      definition:
        "Assignment operators store a value into a variable, using = for basic assignment and forms like += or -= to update a variable based on its current value. They combine calculation with saving the result back into the name.",
      analogy:
        "Assignment is like updating your bank balance after a purchase: you take what you had, apply the change, and write the new total.",
    },
    "Comparison operators": {
      definition:
        "Comparison operators compare two values and produce a boolean result—true or false. Common ones include ===, !==, <, >, <=, and >=, with === checking both value and type for equality.",
      analogy:
        "Comparison operators are like a scale that answers yes or no: 'Is this heavier than that?' without telling you by how much.",
    },
    "Logical operators": {
      definition:
        "Logical operators combine boolean expressions: && requires both sides to be true, || requires at least one side to be true, and ! flips true to false and vice versa. They let you build complex conditions from simpler tests.",
      analogy:
        "Logical operators are like airport security rules: you need a ticket AND an ID, OR a special pass—different combinations decide whether you get through.",
    },
    "Mixing strings and numbers with +": {
      definition:
        "When + is used with a string, JavaScript converts the other operand to text and concatenates them instead of doing numeric addition. This behavior is called string coercion and can surprise you if you expect math.",
      analogy:
        "Mixing strings and numbers with + is like gluing a house number onto a street name—you get a label like '42Main', not a bigger number.",
    },
  },

  "if-else": {
    "Basic if / else": {
      definition:
        "An if statement runs a block of code only when its condition is true; else runs a different block when the condition is false. Together they let the program choose between two paths.",
      analogy:
        "if / else is like choosing an umbrella: if it is raining, you open it; otherwise, you leave it at home.",
    },
    "Chaining with else if": {
      definition:
        "else if adds additional conditions checked in order after the first if fails. The program runs the first block whose condition is true and skips the rest of the chain.",
      analogy:
        "else if is like a multiple-choice question—you try option A, then B, then C, and stop at the first answer that fits.",
    },
    "Combining conditions": {
      definition:
        "You can combine multiple tests in one condition using logical operators such as && and ||. This lets a single if handle situations that depend on more than one fact being true or false.",
      analogy:
        "Combining conditions is like needing both a key and a code to open a safe—one alone is not enough.",
    },
    "Truthy and falsy values": {
      definition:
        "In boolean contexts, values like 0, empty string, null, undefined, and NaN are falsy and treated as false; most other values are truthy and treated as true. if statements use this rule when evaluating non-boolean expressions.",
      analogy:
        "Truthy and falsy are like a bouncer’s simple rule: empty hands (falsy) do not get in, but almost anything else (truthy) does.",
    },
    "Using switch for exact matches": {
      definition:
        "switch compares one value against several exact cases and runs the matching block, with break preventing fall-through to later cases. It is clearest when you test one variable against many specific constant values.",
      analogy:
        "switch is like a vending machine row: you press one button for chips, another for candy—each choice maps to exactly one outcome.",
    },
  },

  "for-while-loops": {
    "The for loop": {
      definition:
        "A for loop repeats a block a known number of times using an initializer, a condition, and an update step in one header line. It is ideal when you know how many iterations you need, such as counting from 0 to 9.",
      analogy:
        "A for loop is like doing ten push-ups: you start at one, keep going while you have not reached ten, and add one each time.",
    },
    "The while loop": {
      definition:
        "A while loop repeats a block as long as its condition stays true, checking the condition before each iteration. Use it when the number of repetitions depends on runtime logic rather than a fixed count.",
      analogy:
        "A while loop is like stirring soup until it tastes right—you keep going while the flavor is not there yet.",
    },
    "Avoiding infinite loops": {
      definition:
        "An infinite loop never ends because the condition always stays true or the loop never updates the values it checks. Always ensure something inside the loop moves the program toward making the condition false.",
      analogy:
        "Avoiding infinite loops is like remembering to turn off a treadmill—you need a stopping condition or you run forever.",
    },
    "Using break": {
      definition:
        "break immediately exits the innermost loop or switch, even if the loop condition would still be true. It is useful when you find what you need early and want to stop searching.",
      analogy:
        "break is like leaving a party the moment you find your lost keys—no need to keep looking room by room.",
    },
    "Using continue": {
      definition:
        "continue skips the rest of the current loop iteration and jumps to the next one without exiting the loop entirely. It lets you ignore cases that do not need processing while keeping the loop running.",
      analogy:
        "continue is like skipping a burnt cookie on the tray and moving to the next one without stopping the whole batch.",
    },
  },

  "nested-loops": {
    "What is a nested loop?": {
      definition:
        "A nested loop is a loop placed inside another loop, so the inner loop runs completely for each iteration of the outer loop. This pattern handles two-dimensional work such as rows and columns or pairs of items.",
      analogy:
        "A nested loop is like reading every page in every book on a shelf: for each book, you go page by page before picking up the next book.",
    },
    "Why use nested loops": {
      definition:
        "Nested loops solve problems where each item must be compared with or combined with every other item, or where data has two levels such as grid coordinates. They are the straightforward way to visit all combinations in a structured order.",
      analogy:
        "Nested loops are like seating guests at tables: for each table, you assign every chair before moving to the next table.",
    },
    "Building strings with a nested loop": {
      definition:
        "You can concatenate characters or lines inside nested loops to build patterns such as triangles, grids, or repeated text. The outer loop often controls rows while the inner loop adds characters to each row.",
      analogy:
        "Building strings with nested loops is like knitting row by row: each row adds another line to the fabric until the pattern is complete.",
    },
    "Scope of break and continue": {
      definition:
        "break and continue affect only the innermost loop they appear in, not outer loops wrapping them. To stop an outer loop from inside a nested loop, you typically need extra flags or restructure the logic.",
      analogy:
        "Scope of break and continue is like shouting 'stop' in one room—it ends activity in that room, not in the whole building.",
    },
    "Naming loop variables": {
      definition:
        "Use clear, distinct names for outer and inner loop variables—such as i and j, or row and col—so readers know which level they refer to. Good names reduce confusion when loops are nested several levels deep.",
      analogy:
        "Naming loop variables is like labeling floors in a building: 'ground' and 'first' are clearer than calling every floor 'level'.",
    },
  },

  "functions-basics": {
    "Defining a function": {
      definition:
        "A function is a reusable block of code with a name that you define once and call whenever you need that behavior. Functions help organize programs by grouping related steps under one label.",
      analogy:
        "Defining a function is like saving a contact in your phone—you write the number once and dial the name whenever you need it.",
    },
    "Parameters vs arguments": {
      definition:
        "Parameters are the placeholder names listed in a function definition; arguments are the actual values you pass when calling the function. The arguments get assigned to the parameters for that single invocation.",
      analogy:
        "Parameters are like empty slots on a form; arguments are the answers you write in when you submit it.",
    },
    "Returning a value": {
      definition:
        "return sends a value back to whoever called the function and ends the function immediately. Callers can store that value in a variable or use it in an expression.",
      analogy:
        "Returning a value is like a vending machine giving you change—the machine finishes its job and hands you something useful.",
    },
    "Default parameters": {
      definition:
        "Default parameters supply a fallback value when the caller omits an argument or passes undefined. They make functions easier to use by covering common cases without extra checks inside the body.",
      analogy:
        "Default parameters are like a café assuming 'regular' milk unless you say otherwise—you still get a drink without specifying every detail.",
    },
    "Functions calling other functions": {
      definition:
        "One function can invoke another to break a large task into smaller, testable pieces. Each function handles one job and passes results along, building complex behavior from simple building blocks.",
      analogy:
        "Functions calling functions is like a relay race—each runner does one leg and hands the baton to the next.",
    },
  },

  "arrow-functions-scope": {
    "What is an arrow function?": {
      definition:
        "An arrow function is a shorter syntax for writing functions using => instead of the function keyword. It is commonly used for callbacks and small operations where brevity improves readability.",
      analogy:
        "An arrow function is like a shorthand note on a sticky pad—quick to write when the idea is small and clear.",
    },
    "Implicit return": {
      definition:
        "When an arrow function body is a single expression without curly braces, JavaScript automatically returns that expression’s value. This removes the need for an explicit return statement in one-liners.",
      analogy:
        "Implicit return is like a vending machine that drops the snack as soon as you pay—no extra button press needed.",
    },
    "Arrow functions with multiple statements": {
      definition:
        "If an arrow function needs more than one statement, wrap the body in curly braces and use return explicitly when you need to send a value back. The concise implicit-return form no longer applies in that case.",
      analogy:
        "Multiple statements in an arrow function are like a recipe with several steps—you need a full checklist, not a one-line summary.",
    },
    "Block scope": {
      definition:
        "Variables declared with let or const inside curly braces { } belong to that block and are not visible outside it. Block scope keeps temporary names from leaking into the rest of the program.",
      analogy:
        "Block scope is like items in a locker—they stay inside until the block ends, then you cannot reach them from the hallway.",
    },
    "Function scope": {
      definition:
        "In a traditional function declaration, var-created variables are visible throughout the entire function, not just the block where they were declared. Functions therefore form a scope boundary for var, while let and const follow block rules.",
      analogy:
        "Function scope is like a office floor pass—var lets you roam the whole floor, while let and const only open certain rooms.",
    },
  },

  "string-basics": {
    "What is a string?": {
      definition:
        "A string is a sequence of characters used to represent text, written in JavaScript between single quotes, double quotes, or backticks. Strings can hold letters, digits, spaces, symbols, and emoji.",
      analogy:
        "A string is like a bead necklace—each character is one bead, and the order of beads spells out a word or sentence.",
    },
    "The length property": {
      definition:
        "Every string has a length property that returns how many characters it contains, accessible with str.length. It counts each character, including spaces and punctuation.",
      analogy:
        "length is like counting how many letters are in a Scrabble rack—it tells you how many tiles you are holding.",
    },
    "Indexing a string": {
      definition:
        "You access a single character in a string with bracket notation and a zero-based index, such as str[0] for the first character. Indices start at 0 and go up to length minus one.",
      analogy:
        "Indexing a string is like apartment numbers in a hallway—number 0 is the first door, number 1 is the next, and so on.",
    },
    "Strings are immutable": {
      definition:
        "Strings cannot be changed in place; operations that appear to modify a string actually create a new string. Assigning to str[i] does not alter the original string value in JavaScript.",
      analogy:
        "Immutable strings are like words printed in a book—you cannot erase one letter; you must print a new page with the corrected word.",
    },
    "Template literals": {
      definition:
        "Template literals are strings written with backticks (`) that can span multiple lines and embed expressions inside ${ }. They make building dynamic text cleaner than concatenating with +.",
      analogy:
        "Template literals are like mad-libs with blanks filled automatically—${name} slots in the value while you write the sentence once.",
    },
    "Traversing a string": {
      definition:
        "Traversing a string means visiting each character in order, usually with a loop from index 0 to length - 1. It is the standard pattern for counting, searching, or transforming text character by character.",
      analogy:
        "Traversing a string is like reading a sentence aloud one letter at a time from start to finish.",
    },
  },

  "string-methods": {
    "The .slice() method": {
      definition:
        "slice(start, end) returns a portion of a string from start up to but not including end, without changing the original. Negative indexes count from the end of the string.",
      analogy:
        "slice is like cutting a segment from a film reel—you copy that clip while the full reel stays untouched.",
    },
    "The .includes() method": {
      definition:
        "includes(searchString) returns true if the string contains the given substring anywhere, and false otherwise. It is a simple way to test for the presence of text without finding its position.",
      analogy:
        "includes is like checking whether a word appears anywhere in a paragraph—you only need a yes or no, not the page number.",
    },
    "Changing case": {
      definition:
        "Methods such as toLowerCase() and toUpperCase() return new strings with all letters converted to the chosen case. They are often used to compare or sort text without worrying about capitalization differences.",
      analogy:
        "Changing case is like typing an email in all caps or all lowercase—the meaning stays the same, but the appearance changes.",
    },
    "Cleaning whitespace with .trim()": {
      definition:
        "trim() removes whitespace characters from the beginning and end of a string and returns a new trimmed string. It is useful for cleaning user input that may have accidental spaces.",
      analogy:
        "trim is like shaving the crust off a sandwich slice—you keep the good part and discard the extra edges.",
    },
    "Finding a position with .indexOf()": {
      definition:
        "indexOf(searchString) returns the zero-based index where a substring first appears, or -1 if it is not found. You can use it to locate text before slicing or replacing.",
      analogy:
        "indexOf is like finding which shelf a book is on in a library—you get the location or learn it is not there (-1).",
    },
    "Splitting text with .split()": {
      definition:
        "split(separator) breaks a string into an array of substrings wherever the separator appears. For example, splitting on a comma turns 'a,b,c' into ['a', 'b', 'c'].",
      analogy:
        "split is like cutting a baguette at each score mark—you end up with separate pieces arranged in order.",
    },
    "Chaining methods": {
      definition:
        "Method chaining calls several string methods in a row on the same value, such as str.trim().toLowerCase(). Each method returns a new string that the next method operates on.",
      analogy:
        "Chaining methods is like an assembly line—each station refines the product before passing it to the next.",
    },
  },

  "string-challenges": {
    "Counting vowels": {
      definition:
        "Counting vowels means looping through a string and incrementing a counter whenever a character is a, e, i, o, or u (often including uppercase). It combines traversal with a conditional test on each character.",
      analogy:
        "Counting vowels is like tallying red cars in traffic—you look at each vehicle and add one only when it matches your rule.",
    },
    "Counting occurrences of a letter": {
      definition:
        "To count how many times a specific letter appears, compare each character to the target and increase a counter on each match. Case sensitivity matters unless you normalize the string first.",
      analogy:
        "Counting a letter is like counting how many times your favorite player’s jersey number shows up in a crowd photo.",
    },
    "Reversing a string": {
      definition:
        "Reversing a string means producing a new string whose characters appear in the opposite order from the original. Common approaches build a new string from the end backward or swap characters from both ends.",
      analogy:
        "Reversing a string is like reading a word in a mirror—the last letter shows up first.",
    },
    "Checking a palindrome": {
      definition:
        "A palindrome reads the same forward and backward, such as 'racecar'. Checking one usually compares the string to its reverse or compares characters from both ends moving inward.",
      analogy:
        "A palindrome is like the word 'BOB' on a name tag—it looks identical whether you read it left to right or right to left.",
    },
    "Testing edge cases": {
      definition:
        "Edge cases are unusual inputs such as empty strings, single characters, or strings with only spaces that might break naive logic. Testing them ensures your function behaves correctly at boundaries, not just on typical examples.",
      analogy:
        "Testing edge cases is like checking whether your umbrella works in drizzle, gale wind, and no rain—not just on a normal rainy day.",
    },
  },

  "arrays-basics": {
    "Creating an array": {
      definition:
        "An array is an ordered list of values created with square brackets, such as [1, 2, 3] or ['a', 'b']. Items can be of mixed types, and the array keeps them in a fixed sequence by index.",
      analogy:
        "Creating an array is like numbering slots in a parking lot—each space holds one car, and the numbers tell you the order.",
    },
    "Accessing items by index": {
      definition:
        "Array elements are accessed with zero-based indexes inside brackets, like arr[0] for the first item. Valid indexes run from 0 through arr.length - 1.",
      analogy:
        "Array indexes are like locker numbers—open locker 0 first, then locker 1, following the labels on the row.",
    },
    "Mutating an item": {
      definition:
        "You can change an existing element by assigning to its index, such as arr[2] = 'new'. This modifies the array in place without creating a new array object.",
      analogy:
        "Mutating an item is like swapping one book on a shelf—you change what is there without rebuilding the whole bookcase.",
    },
    "Adding and removing with push/pop": {
      definition:
        "push adds one or more elements to the end of an array, while pop removes and returns the last element. Both methods mutate the original array and are common for stack-like behavior.",
      analogy:
        "push and pop are like stacking plates—you add on top and take from the top when you are done.",
    },
    "const arrays can still change": {
      definition:
        "Declaring an array with const prevents reassigning the variable to a different array, but the contents can still be modified with methods like push or by index assignment. const locks the binding, not the array’s internal elements.",
      analogy:
        "A const array is like a labeled tray that always stays the same tray—you can still change what is on it, but you cannot swap the tray for a different one.",
    },
  },

  "array-traversal": {
    "The traversal pattern": {
      definition:
        "The traversal pattern visits every element of an array in order, typically with a for loop from index 0 to length - 1. It is the foundation for summing, searching, filtering, and transforming lists.",
      analogy:
        "Traversing an array is like a teacher taking attendance—each name on the list gets checked once, in order.",
    },
    "Calculating a sum": {
      definition:
        "To sum array numbers, start a total at 0 and add each element during traversal. After the loop, the total holds the combined value of all items.",
      analogy:
        "Calculating a sum is like dropping each coin into a jar—you keep adding until every coin is counted.",
    },
    "Calculating an average": {
      definition:
        "The average equals the sum of all numeric elements divided by how many elements there are. You usually compute the sum first, then divide by arr.length, watching out for empty arrays.",
      analogy:
        "An average is like splitting a pizza bill equally—add everything up, then divide by the number of people eating.",
    },
    "Finding the maximum": {
      definition:
        "To find the maximum, track the largest value seen so far while traversing the array, updating whenever a bigger element appears. After the loop, that tracker holds the maximum.",
      analogy:
        "Finding the maximum is like remembering the tallest person as each new person walks through the door—you update your record only when someone is taller.",
    },
    "Finding the minimum": {
      definition:
        "Finding the minimum uses the same traversal pattern but keeps the smallest value seen so far. Initialize with the first element or Infinity, then compare each item during the loop.",
      analogy:
        "Finding the minimum is like tracking the lowest price while shopping—you note a new low whenever you see a cheaper tag.",
    },
  },

  "array-challenges": {
    "Manual search": {
      definition:
        "Manual search walks through an array element by element until it finds a target value or reaches the end. It returns the index if found or a signal such as -1 if the item is absent.",
      analogy:
        "Manual search is like looking for your keys by checking each pocket one at a time until you feel them.",
    },
    "Counting matches": {
      definition:
        "Counting matches increments a counter each time an array element satisfies a condition, such as equaling a target or being greater than a threshold. The final count tells you how many items matched.",
      analogy:
        "Counting matches is like tallying how many red M&Ms are in a bowl—you inspect each piece and add to the pile when it qualifies.",
    },
    "Reversing an array": {
      definition:
        "Reversing an array produces a new order where the first item becomes last and the last becomes first. You can build a new array, swap in place with two pointers, or use methods depending on requirements.",
      analogy:
        "Reversing an array is like flipping a row of dominoes so the last one leads and the first one follows.",
    },
    "Manual filtering": {
      definition:
        "Manual filtering creates a new array containing only elements that pass a test you write in a loop. When an item satisfies the condition, push it into the result array.",
      analogy:
        "Manual filtering is like sorting laundry—you pull out only the shirts that match today's outfit rules and leave the rest in the basket.",
    },
  },

  "objects-basics": {
    "Creating an object": {
      definition:
        "An object groups related values as named properties inside curly braces, such as { name: 'Ada', age: 36 }. Properties connect keys to values so you can model real-world records in code.",
      analogy:
        "Creating an object is like filling out an ID card—each field (name, age, city) stores one piece of information about a person.",
    },
    "Accessing with dot notation": {
      definition:
        "Dot notation reads or writes a property when you know its key name and the key is a valid identifier, using syntax like obj.name. It is the most readable form for fixed, known property names.",
      analogy:
        "Dot notation is like pressing a labeled elevator button—you go directly to the floor named on the button.",
    },
    "Accessing with bracket notation": {
      definition:
        "Bracket notation accesses properties with obj['key'] or obj[variable], which works when the key has spaces, special characters, or is stored in a variable. It is required when the property name is not a simple identifier.",
      analogy:
        "Bracket notation is like looking up a locker with a number you read from a slip of paper—the label can change each time.",
    },
    "Updating and adding properties": {
      definition:
        "Assigning to an existing key updates that property; assigning to a new key adds a property to the object. Objects are mutable, so their shape can grow or change during the program.",
      analogy:
        "Updating and adding properties is like editing a contact card—you can change a phone number or add a new email field anytime.",
    },
    "Nested objects": {
      definition:
        "A nested object is a property whose value is another object, allowing hierarchical data such as a user with an address object inside. You chain dot or bracket notation to reach deeper levels.",
      analogy:
        "Nested objects are like folders inside folders on your computer—open the outer folder, then the inner one, to reach the file you need.",
    },
    "Checking if a key exists": {
      definition:
        "Use the in operator or hasOwnProperty to test whether an object contains a given key before relying on its value. This avoids confusing missing keys with keys that exist but hold undefined.",
      analogy:
        "Checking if a key exists is like knocking on a door before entering—you confirm someone is home instead of assuming.",
    },
  },

  "array-of-objects": {
    "What is an array of objects?": {
      definition:
        "An array of objects stores multiple records in one list, each record being an object with the same or similar properties. It is the standard way to represent collections such as users, products, or scores.",
      analogy:
        "An array of objects is like a stack of student report cards—each card is one object, and the pile is the array.",
    },
    "Accessing one record's field": {
      definition:
        "To read one field from a specific record, index the array first, then access the property, like students[2].grade. Order matters: the array index picks the record, dot notation picks the field.",
      analogy:
        "Accessing one field is like opening drawer 3 of a filing cabinet and reading the 'salary' line on that folder.",
    },
    "Traversing records": {
      definition:
        "Traversing records loops through the array and processes each object, often reading or printing several of its properties. The same traversal pattern used for arrays applies, with an object at each index.",
      analogy:
        "Traversing records is like a teacher reading each attendance sheet in a pile—same format, different student each time.",
    },
    "Searching by a property": {
      definition:
        "Searching by a property walks the array and compares a field—such as id or email—to a target value until a match is found. It returns the matching object or its index, or indicates failure if none match.",
      analogy:
        "Searching by property is like finding a guest by name at a conference—scan each badge until the name matches.",
    },
    "Computing an aggregate over objects": {
      definition:
        "An aggregate such as total sales or average age combines a numeric field across all objects, usually by summing during traversal and then dividing or reporting the result. Each object contributes one value to the calculation.",
      analogy:
        "Computing an aggregate is like adding up every team’s score on a leaderboard to get a league total.",
    },
  },

  "linear-search": {
    "How linear search works": {
      definition:
        "Linear search checks each element from start to end until it finds the target or exhausts the list. It works on any array regardless of order and has a simple loop structure.",
      analogy:
        "Linear search is like looking for a friend in a line of people—you ask each person in order until you find them.",
    },
    "Works on unsorted data": {
      definition:
        "Linear search does not require sorted data because it examines every item sequentially without assuming any order. That makes it suitable when the list is small or arranging data first is not worth the cost.",
      analogy:
        "Linear search on unsorted data is like finding a sock in a messy drawer—you pick through items one by one without any sorting system.",
    },
    "The idea behind binary search": {
      definition:
        "Binary search repeatedly divides a sorted list in half, comparing the target to the middle element and discarding the half that cannot contain it. Each step eliminates about half the remaining items.",
      analogy:
        "Binary search is like guessing a number between 1 and 100 by always asking 'higher or lower?'—each answer cuts the possibilities in half.",
    },
    "Why binary search needs sorted data": {
      definition:
        "Binary search relies on order to know which half to discard; if data is unsorted, the middle comparison cannot safely eliminate half the list. Sorting first creates the ordering binary search depends on.",
      analogy:
        "Binary search needs sorted data like a dictionary needs alphabetical order—without order, jumping to the middle page would not tell you which direction to go.",
    },
    "Comparing the two approaches": {
      definition:
        "Linear search is simpler and fine for small or unsorted lists; binary search is faster on large sorted data but requires sorting first. Choose based on list size, whether data is already sorted, and how often you search.",
      analogy:
        "Choosing between them is like walking every aisle in a store versus using a sorted map—quick browse for a few items, map when the store is huge and well organized.",
    },
  },

  "sorting-basics": {
    "How bubble sort works": {
      definition:
        "Bubble sort compares adjacent pairs and swaps them if they are out of order, repeating passes until no swaps occur on a full pass. Larger values 'bubble' toward the end of the array each pass.",
      analogy:
        "Bubble sort is like bubbles rising in a glass—lighter elements float up through repeated small swaps with neighbors.",
    },
    "How selection sort works": {
      definition:
        "Selection sort finds the smallest remaining element and swaps it into the next correct position, then repeats for the rest of the list. Each pass fixes one more index at the front of the array.",
      analogy:
        "Selection sort is like picking the shortest person for each row in a class photo—you repeatedly choose the next smallest for the next spot.",
    },
    "Swapping with a temporary variable": {
      definition:
        "Swapping two values requires a temporary variable to hold one value while the other is assigned, then completing both assignments. Without temp, overwriting one value would lose data needed for the swap.",
      analogy:
        "Swapping with a temp variable is like moving two drinks using a third cup—you pour one aside before filling each glass.",
    },
    "Copying an array before sorting": {
      definition:
        "Copying before sorting preserves the original order in a separate array while you sort the copy. Use spread [...arr] or slice() so destructive sort algorithms do not mutate data you still need unchanged.",
      analogy:
        "Copying before sorting is like photocopying a document before highlighting—you keep the original intact while marking up the copy.",
    },
    "Comparing the two algorithms": {
      definition:
        "Bubble sort and selection sort are both simple O(n²) algorithms suitable for learning and small datasets, but neither is efficient for large lists. They differ in swap patterns but share similar performance for big n.",
      analogy:
        "Comparing bubble and selection sort is like two slow but reliable ways to organize a small closet—different hand movements, similar time when the closet is tiny.",
    },
  },

  "mini-project-brief": {
    "Choosing your data": {
      definition:
        "Choosing your data means picking a real dataset—such as products, students, or games—that fits your mini-project and motivates you to build search and stats features. Good data has several records with consistent fields you can query.",
      analogy:
        "Choosing your data is like picking a theme for a scrapbook—the theme guides what pictures and labels you will organize.",
    },
    "Writing a search function": {
      definition:
        "A search function takes your array of records and a criterion, then returns matching items or the first match. It encapsulates linear search logic so the rest of your program can call it cleanly.",
      analogy:
        "A search function is like a library catalog—you type a title and it finds the book without you walking every shelf manually each time.",
    },
    "Writing a statistics function": {
      definition:
        "A statistics function computes summaries such as count, sum, average, min, or max over numeric fields in your data. It reuses traversal and aggregation patterns from earlier lessons in one reusable place.",
      analogy:
        "A statistics function is like a dashboard gauge—it reads many raw inputs and shows one meaningful number at a glance.",
    },
    "Writing a filter function": {
      definition:
        "A filter function returns a new array of records that satisfy a condition you define, such as price below a limit or status equal to 'active'. It keeps presentation and business rules separate from raw data storage.",
      analogy:
        "A filter function is like a coffee filter—it lets only the parts that match your criteria pass through to the cup.",
    },
    "Scoping your project realistically": {
      definition:
        "Scoping realistically means choosing features you can finish and demo in the available time, rather than planning an entire application. A small working program with search, stats, and filter beats an unfinished ambitious design.",
      analogy:
        "Scoping realistically is like packing for a weekend trip—bring what fits in one bag instead of everything in your closet.",
    },
  },

  "mini-project-checkpoints": {
    "Checkpoint 1: data ready": {
      definition:
        "Checkpoint 1 confirms you have a structured array of objects loaded in your project, with enough records and consistent property names to build on. Without solid data, later functions have nothing meaningful to process.",
      analogy:
        "Checkpoint 1 is like having ingredients on the counter before cooking—no recipe starts without something in the bowl.",
    },
    "Checkpoint 2: read functions": {
      definition:
        "Checkpoint 2 verifies you can display or inspect your data with helper functions that print records or fields clearly. Readable output proves your data model works before you add search and sort logic.",
      analogy:
        "Checkpoint 2 is like test-driving a car around the block—you confirm it runs before taking a long trip.",
    },
    "Checkpoint 3: search & sort": {
      definition:
        "Checkpoint 3 means your search and sorting features work on the dataset and produce correct results you can show. This is the core algorithmic milestone of the mini-project.",
      analogy:
        "Checkpoint 3 is like installing both a searchlight and shelves in a warehouse—you can find items and arrange them in order.",
    },
    "Checkpoint 4: demo script": {
      definition:
        "Checkpoint 4 is a short script or menu that runs your main features in sequence so a viewer can see the project work without reading all the code. It turns separate functions into a coherent demonstration.",
      analogy:
        "A demo script is like a tour guide’s route—it walks visitors past each highlight in a planned order.",
    },
    "Checkpoint 5: Git history": {
      definition:
        "Checkpoint 5 confirms your project is committed and pushed with a clear history of meaningful commits on GitHub. Good history shows how you built the project step by step and backs up your work.",
      analogy:
        "Git history is like a construction photo album—each commit is a picture proving progress was made over time.",
    },
  },

  "core-review": {
    "Data building blocks": {
      definition:
        "Data building blocks include primitives, strings, arrays, and objects—the structures you use to store and organize information in JavaScript. Fluency with these types lets you model most beginner problems clearly.",
      analogy:
        "Data building blocks are like LEGO base plates and bricks—you combine simple pieces into larger structures.",
    },
    "Control flow building blocks": {
      definition:
        "Control flow building blocks are if/else, loops, break, continue, and switch—the tools that decide which code runs and how many times. They turn linear scripts into programs that react and repeat.",
      analogy:
        "Control flow is like traffic lights and roundabouts—they direct which path code takes and when it stops or keeps going.",
    },
    "Functions and scope": {
      definition:
        "Functions package reusable logic with parameters and return values; scope rules determine where let, const, and var bindings are visible. Together they keep programs modular and avoid name collisions.",
      analogy:
        "Functions and scope are like rooms in a house with labeled doors—each room has its own tools, and hallways define what you can reach from where.",
    },
    "Searching and sorting": {
      definition:
        "Searching finds items in data; sorting arranges data in order so humans and algorithms can use it efficiently. Linear search, binary search, and basic sorts connect the data structures you learned to practical problems.",
      analogy:
        "Searching and sorting are like organizing a toolbox—search finds the wrench; sorting lines every tool by size so the next job is faster.",
    },
    "Putting it all together": {
      definition:
        "Putting it all together means combining variables, control flow, functions, arrays, objects, search, and sort into one coherent mini-project. The goal is not isolated exercises but a small program that demonstrates end-to-end thinking.",
      analogy:
        "Putting it all together is like cooking a full meal—you use every skill from chopping to plating, not just one technique alone.",
    },
  },

  "defense-prep": {
    "Preparing your introduction": {
      definition:
        "Your introduction briefly states who you are, what your mini-project does, and why you chose it—usually in under a minute. A clear opening sets context before you show code or run a demo.",
      analogy:
        "A project introduction is like a movie trailer—it tells the audience what to expect before the main feature starts.",
    },
    "Explaining your data structure": {
      definition:
        "Explaining your data structure means describing what each object represents, which properties it has, and why that shape fits the problem. Reviewers should understand your records without reading every line of code.",
      analogy:
        "Explaining your data structure is like showing a form template—each field has a purpose everyone can read at a glance.",
    },
    "Running a live demo": {
      definition:
        "A live demo executes your project in front of reviewers, showing search, filter, stats, or other features with real input. Practice the demo path so it runs smoothly and highlights your best work.",
      analogy:
        "A live demo is like a cooking show segment—you perform the steps live so the audience tastes the result, not just the recipe.",
    },
    "Preparing for questions": {
      definition:
        "Preparing for questions means anticipating what reviewers might ask about your design, algorithms, edge cases, and Git workflow—and rehearsing clear answers. Honest explanations of trade-offs show deeper understanding than memorized jargon.",
      analogy:
        "Preparing for questions is like studying for an oral exam—you think about likely prompts and how you would explain your choices calmly.",
    },
    "Writing a README": {
      definition:
        "A README is a markdown file in your repository that explains what the project does, how to run it, and what you learned. It helps reviewers and future you understand the project without opening every source file.",
      analogy:
        "A README is like the instruction manual on the box—it tells someone how to set up and use what you built.",
    },
  },
};

export default CONCEPT_ENRICHMENT;
