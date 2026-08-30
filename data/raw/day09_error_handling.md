---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 9 — Errors and Exceptions

## Learning objectives
- Distinguish syntax errors from exceptions
- Handle errors with `try` / `except`
- Use `else` and `finally` clauses
- Raise exceptions intentionally with `raise`

## Key concepts
Two big categories:
1. **Syntax errors**: code cannot be parsed
2. **Exceptions**: code is syntactically correct but fails at runtime (`ZeroDivisionError`, `ValueError`, `KeyError`, ...)

`try` / `except` lets you recover from expected failures instead of crashing.

```python
try:
    risky_operation()
except ValueError:
    handle_it()
```

- `else` runs if no exception occurred in `try`
- `finally` always runs (cleanup)

## Worked examples (code + step-by-step output)

### Example 1 — Catch `ValueError` with fixed bad input
```python
bad_value = "abc"

try:
    number = int(bad_value)
    print("Converted:", number)
except ValueError as err:
    print("Failed:", err)
```

Step-by-step:
1. `int("abc")` cannot convert → raises `ValueError`.
2. Python jumps to the `except ValueError` block.
3. Print the error message from `err`.

Output:
```text
Failed: invalid literal for int() with base 10: 'abc'
```

### Example 2 — `try` / `except` / `else` / `finally` in `divide()`
```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("division by zero!")
        result = None
    else:
        print("result is", result)
    finally:
        print("executing finally clause")
    return result

print("--- Case 1: normal division ---")
divide(10, 2)

print("\n--- Case 2: divide by zero ---")
divide(10, 0)
```

Step-by-step for `divide(10, 2)`:
1. `try`: `10 / 2` → `5.0` (no exception).
2. `else`: print `"result is 5.0"`.
3. `finally`: always runs → print cleanup message.

Step-by-step for `divide(10, 0)`:
1. `try`: `10 / 0` → `ZeroDivisionError`.
2. `except`: print error, set `result = None`.
3. `else`: skipped (exception occurred).
4. `finally`: still runs.

Output:
```text
--- Case 1: normal division ---
result is 5.0
executing finally clause

--- Case 2: divide by zero ---
division by zero!
executing finally clause
```

### Example 3 — Raise `ValueError` for invalid EduCoach score
```python
def set_score(score):
    if score < 0 or score > 20:
        raise ValueError("score must be between 0 and 20")
    return score


test_scores = [14, 25, -1, 10]

for s in test_scores:
    try:
        valid = set_score(s)
        print(f"Score {s} accepted -> {valid}")
    except ValueError as e:
        print(f"Score {s} rejected: {e}")
```

Step-by-step:
| input | check | outcome |
|-------|-------|---------|
| 14 | in range 0..20 | accepted |
| 25 | > 20 | `ValueError` caught |
| -1 | < 0 | `ValueError` caught |
| 10 | in range | accepted |

Output:
```text
Score 14 accepted -> 14
Score 25 rejected: score must be between 0 and 20
Score -1 rejected: score must be between 0 and 20
Score 10 accepted -> 10
```

### Example 4 — Handle missing dictionary key safely
```python
students = {"Alice": 12, "Bob": 7}

def get_score(name):
    try:
        return students[name]
    except KeyError:
        print(f"Warning: no score for '{name}'")
        return None

print("Alice:", get_score("Alice"))
print("Carlos:", get_score("Carlos"))
```

Step-by-step:
1. `"Alice"` exists → return `12` (no exception).
2. `"Carlos"` missing → `KeyError` → print warning, return `None`.

Output:
```text
Alice: 12
Warning: no score for 'Carlos'
Carlos: None
```

## Common mistakes
- Using bare `except:` (too broad; hides real bugs)
- Catching exceptions and silently ignoring them
- Putting too much code inside `try` (narrow the risky part)
- Forgetting cleanup that belongs in `finally` or a `with` block

## Mini exercises (no full solutions)
1. Ask for two numbers and handle division by zero.
2. Convert user input to `int` safely with retries.
3. Raise `ValueError` if a provided score is outside 0..20.

## Summary
- Exceptions signal runtime problems
- `try` / `except` handles recoverable cases
- `else` / `finally` complete the control pattern
- `raise` creates your own error conditions

## Official reference
- https://docs.python.org/3/tutorial/errors.html
