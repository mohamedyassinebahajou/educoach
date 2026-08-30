---
source: Official Python Tutorial (docs.python.org)
license: PSF License Version 2
adapted_for: EduCoach AI SAS (beginner bootcamp)
primary_urls:
  - https://docs.python.org/3/tutorial/
---
# Day 8 — OOP: Inheritance

## Learning objectives
- Derive a child class from a parent class
- Override methods
- Call parent behavior with `super()`
- Understand "is-a" relationships

## Key concepts
Inheritance lets a new class reuse and extend an existing class.

```python
class Child(Parent):
    ...
```

The child inherits attributes and methods from the parent, and can:
- override methods
- add new methods/attributes
- call the parent implementation via `super()`

This models an **is-a** relationship (e.g., `TutorStudent` is a `Student`).

## Worked examples (code + step-by-step output)

### Example 1 — EduCoach: `TutorStudent` extends `Student`
```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def status(self):
        return "at_risk" if self.score < 10 else "ok"


class TutorStudent(Student):
    def __init__(self, name, score, hints_used):
        super().__init__(name, score)
        self.hints_used = hints_used

    def status(self):
        base = super().status()
        if base == "at_risk" and self.hints_used > 5:
            return "critical"
        return base


nina = TutorStudent("Nina", 8, hints_used=7)
leo = TutorStudent("Leo", 8, hints_used=2)

print(nina.name, nina.status())
print(leo.name, leo.status())
```

Step-by-step:
| student | score | hints | parent `status()` | override result |
|---------|-------|-------|-------------------|-----------------|
| Nina | 8 | 7 | `"at_risk"` | hints > 5 → `"critical"` |
| Leo | 8 | 2 | `"at_risk"` | hints ≤ 5 → keep `"at_risk"` |

Output:
```text
Nina critical
Leo at_risk
```

### Example 2 — `Dog` overrides `Animal.speak()`
```python
class Animal:
    def speak(self):
        return "..."


class Dog(Animal):
    def speak(self):
        return "Woof!"


class Cat(Animal):
    def speak(self):
        return "Meow!"


for pet in [Dog(), Cat(), Animal()]:
    print(type(pet).__name__, "says:", pet.speak())
```

Step-by-step:
1. Each class inherits `speak()` from `Animal` unless overridden.
2. `Dog` and `Cat` override with their own sounds.
3. Plain `Animal()` keeps the default `"..."`.

Output:
```text
Dog says: Woof!
Cat says: Meow!
Animal says: ...
```

### Example 3 — `GradedStudent` adds a letter grade
```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def status(self):
        return "at_risk" if self.score < 10 else "ok"


class GradedStudent(Student):
    def __init__(self, name, score, letter):
        super().__init__(name, score)
        self.letter = letter

    def report(self):
        return f"{self.name}: {self.score}/20 ({self.letter}) — {self.status()}"


s = GradedStudent("Alice", 12, "A")
print(s.report())
```

Step-by-step:
1. `super().__init__(name, score)` sets name and score on the parent part.
2. `self.letter = "A"` adds the new attribute on the child.
3. `report()` combines score, letter, and inherited `status()`.

Output:
```text
Alice: 12/20 (A) — ok
```

### Example 4 — Override while preserving parent logic with `super()`
```python
class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def status(self):
        return "at_risk" if self.score < 10 else "ok"


class TutorStudent(Student):
    def __init__(self, name, score, hints_used):
        super().__init__(name, score)
        self.hints_used = hints_used

    def status_message(self):
        base = super().status()
        return f"{self.name} is {base} (hints used: {self.hints_used})"


s = TutorStudent("Bob", 7, hints_used=3)
print(s.status_message())
```

Step-by-step:
1. `super().status()` calls parent method → `"at_risk"` (score 7).
2. Child wraps it in a friendly message including `hints_used`.

Output:
```text
Bob is at_risk (hints used: 3)
```

## Common mistakes
- Forgetting to call `super().__init__(...)` when extending initialization
- Overriding a method and accidentally losing useful parent behavior
- Creating deep inheritance trees that are hard to understand
- Using inheritance where a simple function or composition would be clearer

## Mini exercises (no full solutions)
1. Create `Animal` with method `speak()`, then `Dog(Animal)` that overrides it.
2. Extend `Student` into `GradedStudent` that also stores a letter grade.
3. Override `status()` to include a custom message while still using `super()`.

## Summary
- Inheritance reuses parent behavior
- Child classes can specialize methods
- `super()` accesses parent logic safely
- Prefer simple hierarchies for beginners

## Official reference
- https://docs.python.org/3/tutorial/classes.html#inheritance
