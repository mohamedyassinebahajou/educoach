---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 1 — Variables and Basic Types

## Learning objectives
- Assign values to variables with `=`
- Distinguish `int`, `float`, and `str`
- Use basic arithmetic operators
- Understand that strings are immutable

## Key concepts
In Python, the equal sign `=` assigns a value to a variable. After assignment, you can reuse the name in expressions.

Python numbers are mainly:
- `int` for whole numbers (`2`, `20`)
- `float` for numbers with a fractional part (`1.6`, `5.0`)

Division with `/` always returns a float. Floor division uses `//`, and remainder uses `%`. Powers use `**`.

Strings (`str`) hold text. You can write them with single quotes `'...'` or double quotes `"..."`. Comments start with `#` and are ignored by Python.

## Worked examples (code + step-by-step output)

### Example 1 — Assignment and arithmetic
```python
width = 20
height = 5 * 9
area = width * height
print("Area:", area)
print(17 / 3)
print(17 // 3)
print(17 % 3)
print(5 ** 2)
```

Step-by-step execution:
1. `width = 20` and `height = 5 * 9` → `height` is `45`.
2. `area = width * height` → `20 * 45` = `900`.
3. `17 / 3` → true division → float `5.666...`
4. `17 // 3` → floor division → `5`
5. `17 % 3` → remainder → `2`
6. `5 ** 2` → power → `25`

Output:
```text
Area: 900
5.666666666666667
5
2
25
```

### Example 2 — String indexing and slicing
```python
name = "Python"
print(name[0])
print(name[-1])
print(name[0:2])
print(len(name))
```

Step-by-step:
| expression | meaning | result |
|------------|---------|--------|
| `name[0]` | first character | `'P'` |
| `name[-1]` | last character | `'n'` |
| `name[0:2]` | slice from index 0 up to (not including) 2 | `'Py'` |
| `len(name)` | number of characters | `6` |

Output:
```text
P
n
Py
6
```

### Example 3 — Strings are immutable (build a new string)
```python
word = "Python"
new_word = "J" + word[1:]
print(new_word)
```

Step-by-step:
1. `word[1:]` slices from index 1 to the end → `"ython"`.
2. `"J" + "ython"` builds a **new** string → `"Jython"`.
3. The original `word` is unchanged (strings cannot be modified in place).

Output:
```text
Jython
```

### Example 4 — EduCoach: student name and score string
```python
student = "EduCoach"
print("First 3:", student[:3])
print("Last 3:", student[-3:])

score_str = "42"
score = int(score_str)
doubled = score * 2
print("Doubled score:", doubled)
```

Step-by-step:
1. `student[:3]` → characters at indices 0, 1, 2 → `"Edu"`.
2. `student[-3:]` → last 3 characters → `"ach"`.
3. `int("42")` converts the string to integer `42`.
4. `42 * 2` → `84`.

Output:
```text
First 3: Edu
Last 3: ach
Doubled score: 84
```

## Common mistakes
- Using a variable before assigning it (`NameError`)
- Confusing `/` (true division) with `//` (floor division)
- Trying to change a character inside a string (`TypeError`)
- Forgetting that `"1975"` is a string, not an integer

## Mini exercises (no full solutions)
1. Create variables `price` and `quantity`, then compute `total`.
2. Given `word = "educoach"`, print the first 3 characters and the last 3 characters.
3. Convert the string `"42"` into an integer and multiply it by 2.

## Summary
- `=` stores values in variables
- `int` / `float` / `str` are core beginner types
- `/`, `//`, `%`, `**` are essential numeric operators
- Strings support indexing and slicing, but are immutable

## Official reference
- https://docs.python.org/3/tutorial/introduction.html
