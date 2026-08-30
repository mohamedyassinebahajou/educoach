---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 11 — Final Project Workshop

## Learning objectives
- Combine variables, conditions, loops, lists, dicts, functions, and files
- Build a tiny end-to-end beginner project
- Practice reading requirements and splitting work into functions
- Prepare for evening evaluation style tasks

## Key concepts
A final project is not a new syntax chapter. It is integration day.

You reuse earlier tools:
- variables and types
- `if` / loops
- lists and dictionaries
- functions for clean structure
- files/JSON for persistence
- basic error handling for bad input

Recommended project shape:
1. Load or create data
2. Process / compute
3. Display results
4. Optionally save output

## Worked examples (code + step-by-step output)

### Example 1 — Student Risk Tracker (full script)
```python
import json

students = [
    {"id": 1, "name": "Alice", "score": 12},
    {"id": 2, "name": "Bob", "score": 7},
    {"id": 3, "name": "Carlos", "score": 9},
    {"id": 4, "name": "Diana", "score": 15},
]


def is_at_risk(student):
    return student["score"] < 10


def summarize(students):
    at_risk = []
    total_score = 0
    for s in students:
        total_score += s["score"]
        if is_at_risk(s):
            at_risk.append(s)
    avg = total_score / len(students) if students else 0
    return {
        "total": len(students),
        "average_score": avg,
        "at_risk_count": len(at_risk),
        "at_risk_students": at_risk,
    }


def print_report(summary):
    print("=== EduCoach Student Risk Report ===")
    print(f"Total students: {summary['total']}")
    print(f"Average score:  {summary['average_score']:.1f}")
    print(f"At risk count:  {summary['at_risk_count']}")
    if summary["at_risk_students"]:
        print("At-risk list:")
        for s in summary["at_risk_students"]:
            print(f"  - {s['name']} (score {s['score']})")
    else:
        print("No students at risk.")


summary = summarize(students)
print_report(summary)

with open("output.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)
print("\nSaved to output.json")
```

Step-by-step execution:
1. **Load data**: list of 4 student dicts with `id`, `name`, `score`.
2. **Process**: loop all students, sum scores, collect those with `score < 10`.
3. **Compute**: Bob (7) and Carlos (9) are at risk; average = `(12+7+9+15)/4 = 10.75`.
4. **Display**: print formatted report.
5. **Persist**: write summary dict to `output.json`.

Output:
```text
=== EduCoach Student Risk Report ===
Total students: 4
Average score:  10.8
At risk count:  2
At-risk list:
  - Bob (score 7)
  - Carlos (score 9)

Saved to output.json
```

The saved `output.json` file contains:
```text
{
  "total": 4,
  "average_score": 10.75,
  "at_risk_count": 2,
  "at_risk_students": [
    {"id": 2, "name": "Bob", "score": 7},
    {"id": 3, "name": "Carlos", "score": 9}
  ]
}
```

### Example 2 — Validate scores with error handling
```python
students = [
    {"name": "Alice", "score": 12},
    {"name": "Bob", "score": 7},
    {"name": "Eve", "score": 25},   # invalid
    {"name": "Dan", "score": -3},   # invalid
]


def validate_score(score):
    if score < 0 or score > 20:
        raise ValueError(f"score must be 0..20, got {score}")
    return score


def process_students(students):
    valid = []
    errors = []
    for s in students:
        try:
            score = validate_score(s["score"])
            valid.append({"name": s["name"], "score": score})
        except ValueError as e:
            errors.append({"name": s["name"], "error": str(e)})
    return valid, errors


valid, errors = process_students(students)

print("Valid students:")
for s in valid:
    status = "at_risk" if s["score"] < 10 else "ok"
    print(f"  {s['name']}: {s['score']} -> {status}")

print("\nRejected entries:")
for e in errors:
    print(f"  {e['name']}: {e['error']}")
```

Step-by-step:
| student | score | validation | result |
|---------|-------|------------|--------|
| Alice | 12 | OK | valid, status `ok` |
| Bob | 7 | OK | valid, status `at_risk` |
| Eve | 25 | `ValueError` | rejected |
| Dan | -3 | `ValueError` | rejected |

Output:
```text
Valid students:
  Alice: 12 -> ok
  Bob: 7 -> at_risk

Rejected entries:
  Eve: score must be 0..20, got 25
  Dan: score must be 0..20, got -3
```

### Example 3 — Load JSON, update a score, save and reload
```python
import json

# Create initial data file
data = {
    "students": [
        {"id": 1, "name": "Alice", "score": 12},
        {"id": 2, "name": "Bob", "score": 7},
    ]
}
with open("students.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("--- After initial save ---")
with open("students.json", encoding="utf-8") as f:
    print(f.read())

# Load, update Bob's score, save again
with open("students.json", encoding="utf-8") as f:
    loaded = json.load(f)

for s in loaded["students"]:
    if s["name"] == "Bob":
        s["score"] = 11

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(loaded, f, indent=2)

print("\n--- After updating Bob to 11 ---")
with open("students.json", encoding="utf-8") as f:
    updated = json.load(f)

for s in updated["students"]:
    status = "at_risk" if s["score"] < 10 else "ok"
    print(f"{s['name']}: score={s['score']} -> {status}")
```

Step-by-step:
1. Write initial JSON with Alice (12) and Bob (7).
2. Reload from disk into a Python dict.
3. Find Bob and change score from 7 → 11.
4. Save back to `students.json`.
5. Reload and print each student's status (Bob now `ok`).

Output:
```text
--- After initial save ---
{
  "students": [
    {
      "id": 1,
      "name": "Alice",
      "score": 12
    },
    {
      "id": 2,
      "name": "Bob",
      "score": 7
    }
  ]
}

--- After updating Bob to 11 ---
Alice: score=12 -> ok
Bob: score=11 -> ok
```

## Design checklist
- One function = one responsibility
- Validate inputs early
- Use clear names (`score`, not `x1`)
- Persist important results to a file
- Test with at least 2–3 sample students

## Common mistakes
- Putting all code in one long script with no functions
- Hard-coding values that should be variables
- Forgetting to handle empty lists
- Saving files without `encoding="utf-8"`
- Mixing display logic and calculation logic

## Mini exercises (no full solutions)
1. Add a feature: count average score.
2. Add a feature: update one student's score from user input.
3. Reload the JSON file and reprint the summary.

## Summary
- Final day = combine previous days
- Prefer small functions and clear data structures
- Files/JSON make your program useful beyond one run
- Error handling makes demos more robust

## Official references used across the SAS
- https://docs.python.org/3/tutorial/
- https://docs.python.org/3/tutorial/introduction.html
- https://docs.python.org/3/tutorial/controlflow.html
- https://docs.python.org/3/tutorial/datastructures.html
- https://docs.python.org/3/tutorial/classes.html
- https://docs.python.org/3/tutorial/errors.html
- https://docs.python.org/3/tutorial/inputoutput.html
