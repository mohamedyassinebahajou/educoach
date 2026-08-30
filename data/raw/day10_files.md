---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 10 — Files

## Learning objectives
- Open files with `open()`
- Read and write text safely
- Prefer the `with` statement for automatic closing
- Know basic modes: `'r'`, `'w'`, `'a'`

## Key concepts
`open(filename, mode, encoding="utf-8")` returns a file object.

Common modes:
- `'r'` read (default)
- `'w'` write (overwrites existing file)
- `'a'` append

Best practice: use `with`, so the file closes automatically even if an error happens.

Useful methods:
- `read()`, `readline()`, `readlines()`
- `write(string)`
- iterate line by line: `for line in f:`

For structured data, JSON is often easier than manual parsing.

## Worked examples (code + step-by-step output)

### Example 1 — Write student scores, then read all content
```python
filename = "students_scores.txt"

# Step 1: write three lines (one student per line)
with open(filename, "w", encoding="utf-8") as f:
    f.write("Alice,12\n")
    f.write("Bob,7\n")
    f.write("Carlos,15\n")

# Step 2: read entire file
with open(filename, encoding="utf-8") as f:
    data = f.read()

print("File contents after write:")
print(data)
print("Characters read:", len(data))
```

Step-by-step:
1. `'w'` mode creates/overwrites `students_scores.txt`.
2. Three `write()` calls produce:
   ```
   Alice,12
   Bob,7
   Carlos,15
   ```
3. `'r'` mode (default) reads everything into `data`.
4. `len(data)` counts characters including newlines.

Output:
```text
File contents after write:
Alice,12
Bob,7
Carlos,15

Characters read: 27
```

### Example 2 — Read line by line and count at-risk scores
```python
filename = "students_scores.txt"

at_risk_count = 0
print("Line-by-line read:")
with open(filename, encoding="utf-8") as f:
    for line in f:
        print("  raw line:", repr(line))
        name, score_str = line.strip().split(",")
        score = int(score_str)
        if score < 10:
            at_risk_count += 1
            print(f"  -> {name} is at risk (score {score})")

print("Total at risk:", at_risk_count)
```

Step-by-step:
| line | stripped | score | at risk? |
|------|----------|-------|----------|
| `"Alice,12\n"` | Alice, 12 | 12 | No |
| `"Bob,7\n"` | Bob, 7 | 7 | Yes |
| `"Carlos,15\n"` | Carlos, 15 | 15 | No |

Output:
```text
Line-by-line read:
  raw line: 'Alice,12\n'
  raw line: 'Bob,7\n'
  -> Bob is at risk (score 7)
  raw line: 'Carlos,15\n'
Total at risk: 1
```

### Example 3 — Append a new student
```python
filename = "students_scores.txt"

print("Before append:")
with open(filename, encoding="utf-8") as f:
    print(f.read())

with open(filename, "a", encoding="utf-8") as f:
    f.write("Diana,9\n")

print("After append:")
with open(filename, encoding="utf-8") as f:
    print(f.read())
```

Step-by-step:
1. Read current file (3 lines).
2. `'a'` mode adds `"Diana,9\n"` at the end without erasing existing content.
3. File now has 4 lines.

Output:
```text
Before append:
Alice,12
Bob,7
Carlos,15

After append:
Alice,12
Bob,7
Carlos,15
Diana,9

```

### Example 4 — Save and load JSON student record
```python
import json

json_file = "student.json"
payload = {"student_id": 1, "name": "Alice", "score": 14.5}

with open(json_file, "w", encoding="utf-8") as f:
    json.dump(payload, f)

print("Written JSON object:", payload)

with open(json_file, encoding="utf-8") as f:
    loaded = json.load(f)

print("Loaded from file:", loaded)
print("Type of loaded['score']:", type(loaded["score"]))
```

Step-by-step:
1. Python dict `payload` is serialized to JSON text in `student.json`.
2. File contains something like: `{"student_id": 1, "name": "Alice", "score": 14.5}`
3. `json.load()` parses it back into a Python dict.
4. JSON numbers become Python `float` or `int`.

Output:
```text
Written JSON object: {'student_id': 1, 'name': 'Alice', 'score': 14.5}
Loaded from file: {'student_id': 1, 'name': 'Alice', 'score': 14.5}
Type of loaded['score']: <class 'float'>
```

## Common mistakes
- Forgetting to close files when not using `with`
- Using `'w'` by accident and erasing existing content
- Ignoring text encoding (prefer `encoding="utf-8"`)
- Calling `read()` twice and being surprised the second call returns `''`

## Mini exercises (no full solutions)
1. Write three student names into a text file, one per line.
2. Read the file and print how many lines it contains.
3. Save a dictionary of scores as JSON, then load it back.

## Summary
- `open` + `with` is the standard safe pattern
- Choose mode carefully (`r`/`w`/`a`)
- Iterate files line by line for large text
- JSON helps store structured Python objects

## Official reference
- https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files
