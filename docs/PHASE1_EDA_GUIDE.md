# Phase 1 — Exploratory Data Analysis (EDA)

**Project:** EduCoach AI  
**File to create / fill:** `notebooks/01_EDA_and_Data_Gen.ipynb`  
**Data source:** `data/processed/student_performance.csv`  
**Goal:** Understand the dataset *before* training the Random Forest (Phase 2).

> You write the notebook. This guide documents **what each step means**, **which methods to use**, and **what “good” looks like**.  
> Prefer typing the code yourself — reading docs sticks better than copy-paste.

---

## Table of contents

1. [What is EDA and why it matters](#1-what-is-eda-and-why-it-matters)
2. [Environment setup (Cursor notebook)](#2-environment-setup-cursor-notebook)
3. [Dataset dictionary](#3-dataset-dictionary)
4. [Notebook structure (cell plan)](#4-notebook-structure-cell-plan)
5. [Step-by-step guide with methods](#5-step-by-step-guide-with-methods)
6. [Method reference sheet](#6-method-reference-sheet)
7. [Insights template](#7-insights-template)
8. [Definition of Done + common mistakes](#8-definition-of-done--common-mistakes)

---

## 1. What is EDA and why it matters

**EDA (Exploratory Data Analysis)** = look at your data with tables and plots to answer:

| Question | Why the coach / ML care |
|----------|-------------------------|
| Is the CSV clean (no NaNs, wrong types)? | Broken rows → broken model |
| What does `today_eval_score` look like? | Skewed scores change metrics |
| How many rows are `at_risk`? | Class balance affects Recall |
| Which features relate to the score? | Tells you what the RF might learn |
| Does the synthetic generator behave as designed? | Validates Phase 0 |

**Rule:** never train a model on data you have not inspected.

---

## 2. Environment setup (Cursor notebook)

### 2.1 One-time install

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
pip install ipykernel matplotlib seaborn pandas numpy
python -m ipykernel install --user --name=educoach --display-name="Python (EduCoach)"
```

| Package | Role |
|---------|------|
| `pandas` | Tables (DataFrame), load CSV, stats |
| `numpy` | Numeric helpers |
| `matplotlib` | Base plotting |
| `seaborn` | Nicer statistical plots (heatmap, hist) |
| `ipykernel` | Lets Cursor run notebooks with your `.venv` |

### 2.2 Open the notebook

1. Open `notebooks/01_EDA_and_Data_Gen.ipynb`
2. Top-right → select kernel **Python (EduCoach)** or `.venv/bin/python`
3. Run a cell with **Shift+Enter**
4. Delete the old `print("hello world !!")` cell when you start for real

### 2.3 Path tip (important)

Your notebook lives in `notebooks/`, so the CSV is **one folder up**:

```python
DATA_PATH = "../data/processed/student_performance.csv"
```

If you get `FileNotFoundError`, check:
- Working directory of the kernel (often the folder of the `.ipynb`)
- That `student_performance.csv` exists (re-run `python data/synthetic/generate_data.py` if needed)

---

## 3. Dataset dictionary

**Shape expected:** `264` rows = `24` students × `11` days.

| Column | Type | Range / values | Meaning |
|--------|------|----------------|---------|
| `student_id` | int | 1–24 | Student identity |
| `day` | int | 1–11 | Day of the SAS |
| `topic` | str | see list below | Concept of the day |
| `exercises_attempted` | int | 1–5 | How many exercises tried |
| `exercises_solved_correctly` | int | 0–5 | How many solved (≤ attempted) |
| `hints_used` | int | 0–10 | Help requests to the assistant |
| `time_spent_minutes` | int | 15–120 | Time on exercises |
| `previous_eval_score` | float | 0–20 | Yesterday’s evening score |
| `today_eval_score` | float | 0–20 | **Target** — tonight’s score |
| `at_risk` | bool | True/False | **Derived target** — `today_eval_score < 10` |

**Topics (day order):**  
`variables` → `conditions` → `loops` → `lists` → `functions` → `dictionaries` → `oop_classes` → `oop_inheritance` → `error_handling` → `files` → `final_project`

**Generation logic (reminder):**

```text
today ≈ previous * 0.6 + (solved / attempted) * 10 + noise
if solved < 3 AND hints > 5 → penalty −4
```

---

## 4. Notebook structure (cell plan)

Use this outline. Alternate **Markdown** (titles) and **Code** cells.

| # | Cell type | Title |
|---|-----------|--------|
| 0 | Markdown | `# Phase 1 — EDA \| EduCoach AI` + short goal |
| 1 | Code | Imports + path constants |
| 2 | Code | Load CSV |
| 3 | Markdown | `## 1. First look` |
| 4 | Code | Shape, columns, head/tail, dtypes |
| 5 | Markdown | `## 2. Data quality` |
| 6 | Code | Nulls, duplicates, value ranges, logical checks |
| 7 | Markdown | `## 3. Univariate — scores & risk` |
| 8 | Code | Describe scores + at-risk counts |
| 9 | Code | Histogram of `today_eval_score` |
| 10 | Markdown | `## 4. Bivariate — features vs score` |
| 11 | Code | Scatter / boxplots (hints, success rate, previous score) |
| 12 | Markdown | `## 5. Correlations` |
| 13 | Code | Correlation matrix + heatmap |
| 14 | Markdown | `## 6. Optional extras` |
| 15 | Code | Per-topic / per-student views (optional) |
| 16 | Markdown | `## 7. Insights` (your bullets) |

---

## 5. Step-by-step guide with methods

---

### STEP 0 — Imports

**Why:** Load libraries once at the top.

```python
from pathlib import Path

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Notebook-friendly plot size
plt.rcParams["figure.figsize"] = (8, 4)
sns.set_theme(style="whitegrid")

DATA_PATH = Path("../data/processed/student_performance.csv")
```

| Symbol / call | What it does |
|---------------|--------------|
| `Path(...)` | Safer file paths than raw strings |
| `pd` | pandas alias (convention) |
| `plt.rcParams[...]` | Global Matplotlib defaults |
| `sns.set_theme(...)` | Seaborn style for all plots |

---

### STEP 1 — Load the CSV

**Method:** [`pandas.read_csv`](https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html)

```python
df = pd.read_csv(DATA_PATH)
df.head()
```

| Method | Docs idea | What you look for |
|--------|-----------|-------------------|
| `pd.read_csv(path)` | Parse CSV → DataFrame | File loads without error |
| `df.head(n=5)` | First `n` rows | Columns look right |
| `df.tail(n=5)` | Last `n` rows | No truncated / weird ending |
| `df.sample(n=5, random_state=42)` | Random rows | Spot-check variety |

**Expected:** table with the 10 columns from the dictionary.

---

### STEP 2 — First look (shape, types, preview)

```python
print("Shape:", df.shape)          # (rows, columns)
print("Rows × cols expected: (264, 10)")

print("\nColumns:")
print(df.columns.tolist())

print("\nDtypes:")
print(df.dtypes)

df.info()
```

| Method / attribute | Meaning | Expected for EduCoach |
|--------------------|---------|------------------------|
| `df.shape` | `(n_rows, n_cols)` | `(264, 10)` |
| `df.columns` | Column Index | 10 names |
| `df.dtypes` | Type per column | ints/floats/object/bool |
| `df.info()` | Non-null counts + memory | No missing cells |
| `len(df)` | Number of rows | `264` |
| `df.index` | Row labels | `0 … 263` |

**Assert (optional but good habit):**

```python
assert df.shape == (264, 10), f"Unexpected shape: {df.shape}"
assert df["student_id"].nunique() == 24
assert df["day"].nunique() == 11
assert df["topic"].nunique() == 11
```

| Method | Meaning |
|--------|---------|
| `Series.nunique()` | Count of distinct values |
| `assert condition` | Crash early if data is wrong |

---

### STEP 3 — Data quality checks

#### 3.1 Missing values

```python
df.isnull().sum()
# or
df.isna().sum()
```

| Method | Meaning |
|--------|---------|
| `df.isnull()` / `df.isna()` | Boolean mask of missing cells |
| `.sum()` | Count `True` per column |

**Expected:** all zeros (synthetic generator should not produce NaNs).

#### 3.2 Duplicates

```python
df.duplicated().sum()
df.duplicated(subset=["student_id", "day"]).sum()
```

| Method | Meaning |
|--------|---------|
| `df.duplicated()` | True if entire row is a repeat |
| `subset=[...]` | Duplicate key for student×day |

**Expected:** `0` — one row per student per day.

#### 3.3 Value ranges (sanity)

```python
print(df["today_eval_score"].min(), df["today_eval_score"].max())
print(df["hints_used"].min(), df["hints_used"].max())
print(df["exercises_attempted"].min(), df["exercises_attempted"].max())
```

| Method | Meaning |
|--------|---------|
| `Series.min()` / `max()` | Extremes |
| `Series.mean()` / `median()` / `std()` | Center & spread |

**Logical check — solved ≤ attempted:**

```python
invalid = df["exercises_solved_correctly"] > df["exercises_attempted"]
print("Invalid rows:", invalid.sum())
```

| Operator on Series | Meaning |
|--------------------|---------|
| `>` / `<` / `==` | Element-wise comparison → boolean Series |
| `boolean_series.sum()` | Count of `True` |

**Expected:** `Invalid rows: 0`

#### 3.4 Descriptive statistics

**Method:** [`DataFrame.describe`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html)

```python
df.describe()                 # numeric only by default
df.describe(include="all")    # also categoricals if any
```

| Stat in `describe()` | Meaning |
|----------------------|---------|
| `count` | Non-null values |
| `mean` | Average |
| `std` | Standard deviation (spread) |
| `min` / `25%` / `50%` / `75%` / `max` | Distribution summary (`50%` = median) |

---

### STEP 4 — Target: score & at-risk

#### 4.1 Score summary

```python
score = df["today_eval_score"]
print("mean:", score.mean())
print("std :", score.std())
print("min :", score.min())
print("max :", score.max())
```

#### 4.2 At-risk balance

```python
# Counts
print(df["at_risk"].value_counts())

# Percentages
print(df["at_risk"].value_counts(normalize=True) * 100)

# Verify definition: at_risk == (score < 10)
mismatch = df["at_risk"] != (df["today_eval_score"] < 10)
print("Definition mismatches:", mismatch.sum())
```

| Method | Meaning |
|--------|---------|
| `value_counts()` | Frequency of each unique value |
| `normalize=True` | Proportions instead of counts |
| `!=` between Series | Find rows where definition breaks |

**What to write down:** % at-risk (earlier run was ~50% — note it; high imbalance or near-balance both matter for Phase 2 Recall).

---

### STEP 5 — Histogram of `today_eval_score`

**Why:** See if scores are centered, skewed, multimodal, or piled near 0/20.

```python
fig, ax = plt.subplots()
sns.histplot(data=df, x="today_eval_score", bins=20, kde=True, ax=ax)
ax.axvline(10, color="red", linestyle="--", label="At-risk threshold (10)")
ax.set_title("Distribution of today_eval_score")
ax.set_xlabel("Score (/20)")
ax.legend()
plt.show()
```

| Function | Library | Meaning |
|----------|---------|---------|
| `plt.subplots()` | Matplotlib | Create figure + axes |
| `sns.histplot(...)` | Seaborn | Histogram (+ optional KDE curve) |
| `bins=20` | — | Number of bars |
| `kde=True` | — | Smooth density estimate |
| `ax.axvline(10, ...)` | Matplotlib | Vertical line at threshold |
| `ax.set_title` / `set_xlabel` | — | Labels |
| `plt.show()` | — | Render in notebook |

**Optional (compare groups):**

```python
sns.histplot(data=df, x="today_eval_score", hue="at_risk", bins=20, element="step")
plt.show()
```

---

### STEP 6 — Features vs score (bivariate)

#### 6.1 Hints vs score (scatter)

```python
sns.scatterplot(
    data=df,
    x="hints_used",
    y="today_eval_score",
    hue="at_risk",
    alpha=0.6,
)
plt.title("Hints used vs today's score")
plt.show()
```

| Argument | Meaning |
|----------|---------|
| `x`, `y` | Axes columns |
| `hue` | Color by category |
| `alpha` | Transparency (overlap visibility) |

**What to look for:** many hints + low score clusters (generator penalty: `solved < 3` & `hints > 5`).

#### 6.2 Boxplot by hints (optional)

```python
sns.boxplot(data=df, x="hints_used", y="today_eval_score")
plt.title("Score distribution by hints_used")
plt.show()
```

| Plot | When to use |
|------|-------------|
| Scatter | Continuous / many levels |
| Boxplot | Distribution per category / integer level |

#### 6.3 Success rate vs score

Create a derived column, then plot:

```python
df = df.copy()
df["success_rate"] = df["exercises_solved_correctly"] / df["exercises_attempted"]

sns.scatterplot(data=df, x="success_rate", y="today_eval_score", hue="at_risk", alpha=0.6)
plt.title("Exercise success rate vs score")
plt.show()
```

| Pattern | Meaning |
|---------|---------|
| `df["new"] = ...` | Add a column |
| `/` on Series | Element-wise division |
| `df.copy()` | Avoid SettingWithCopy warnings |

#### 6.4 Previous score vs today (persistence)

```python
sns.scatterplot(
    data=df,
    x="previous_eval_score",
    y="today_eval_score",
    alpha=0.5,
)
plt.plot([0, 20], [0, 20], "r--", label="y = x")
plt.legend()
plt.title("Previous vs today score")
plt.show()
```

**Interpretation:** points near the diagonal → yesterday’s score strongly carries over (matches `* 0.6` in the formula).

---

### STEP 7 — Correlation heatmap

**Why:** Numeric summary of linear relationships. High |corr| with `today_eval_score` → likely useful features for the model.

```python
numeric_cols = [
    "day",
    "exercises_attempted",
    "exercises_solved_correctly",
    "hints_used",
    "time_spent_minutes",
    "previous_eval_score",
    "today_eval_score",
    "success_rate",  # if you created it
]

corr = df[numeric_cols].corr(method="pearson")
corr
```

```python
plt.figure(figsize=(10, 8))
sns.heatmap(
    corr,
    annot=True,      # write numbers in cells
    fmt=".2f",       # 2 decimal places
    cmap="coolwarm",
    center=0,
    square=True,
)
plt.title("Feature correlation (Pearson)")
plt.tight_layout()
plt.show()
```

| Method / arg | Meaning |
|--------------|---------|
| `DataFrame.corr(method="pearson")` | Pairwise linear correlation in `[-1, 1]` |
| `method="spearman"` | Rank correlation (non-linear monotonic) |
| `annot=True` | Show values on heatmap |
| `center=0` | Diverging colormap around 0 |
| `cmap` | Color palette |

**How to read Pearson `r`:**

| \|r\| | Rough meaning |
|-------|----------------|
| 0.0–0.2 | Weak |
| 0.2–0.5 | Moderate |
| 0.5–0.8 | Strong |
| 0.8–1.0 | Very strong (check leakage!) |

**Focus row/column:** `today_eval_score` — note top correlated features for Phase 2.

Also:

```python
corr["today_eval_score"].sort_values(ascending=False)
```

| Method | Meaning |
|--------|---------|
| `Series.sort_values(ascending=False)` | Rank features by correlation with target |

---

### STEP 8 — Optional extras (nice for soutenance)

#### 8.1 Mean score by topic

```python
topic_scores = (
    df.groupby("topic", sort=False)["today_eval_score"]
    .mean()
    .reset_index()
)

sns.barplot(data=topic_scores, x="topic", y="today_eval_score")
plt.xticks(rotation=75, ha="right")
plt.title("Average score by topic")
plt.tight_layout()
plt.show()
```

| Method | Meaning |
|--------|---------|
| `groupby("topic")` | Split data by topic |
| `.mean()` | Average inside each group |
| `reset_index()` | Turn group keys back into columns |
| `plt.xticks(rotation=...)` | Rotate labels so they fit |

#### 8.2 At-risk rate per student

```python
risk_by_student = (
    df.groupby("student_id")["at_risk"]
    .mean()
    .sort_values(ascending=False)
)
risk_by_student.head(10)  # chronically struggling students
```

**Coach story:** “Student 7 is at-risk X% of days” → exactly what the dashboard will show later.

#### 8.3 Penalty cohort check (generator validation)

```python
struggling = (df["exercises_solved_correctly"] < 3) & (df["hints_used"] > 5)
print("Rows matching penalty rule:", struggling.sum())
print("Mean score (penalty group):", df.loc[struggling, "today_eval_score"].mean())
print("Mean score (others):", df.loc[~struggling, "today_eval_score"].mean())
```

| Syntax | Meaning |
|--------|---------|
| `&` | Element-wise AND (use parentheses) |
| `~` | Element-wise NOT |
| `df.loc[mask, col]` | Filter rows then pick column |

**Expected:** penalty group has a **lower** mean score.

---

### STEP 9 — Write insights (Markdown cell)

Do **not** skip this. Phase 1 is done only when you interpret, not only when you plot.

Use the [template below](#7-insights-template).

---

## 6. Method reference sheet

### pandas — inspection

| Method | Purpose |
|--------|---------|
| `pd.read_csv(path)` | Load CSV |
| `df.head()` / `tail()` / `sample()` | Preview rows |
| `df.shape` | `(rows, cols)` |
| `df.info()` | Types + non-null counts |
| `df.describe()` | Numeric summary |
| `df.dtypes` | Column types |
| `df.columns` | Column names |
| `df.isnull().sum()` | Missing counts |
| `df.duplicated().sum()` | Duplicate rows |
| `df["col"].value_counts()` | Category / bool frequencies |
| `df["col"].nunique()` | Distinct count |
| `df.groupby(col).agg(...)` | Aggregations by group |
| `df.corr()` | Correlation matrix |
| `df.loc[mask]` | Filter by boolean mask |
| `df.copy()` | Independent copy |
| `Series.sort_values()` | Sort a column |
| `Series.mean/std/min/max()` | Univariate stats |

### pandas — create / transform

| Pattern | Purpose |
|---------|---------|
| `df["x"] = df["a"] / df["b"]` | New feature |
| `(df["a"] < 3) & (df["b"] > 5)` | Combined filter |
| `df.rename(columns={...})` | Rename (later phases) |
| `pd.get_dummies(df["topic"])` | One-hot encode (Phase 2) |

### seaborn / matplotlib — plots

| Function | Purpose |
|----------|---------|
| `sns.histplot` | Distribution |
| `sns.scatterplot` | Two continuous variables |
| `sns.boxplot` | Distribution by category |
| `sns.heatmap` | Matrix (correlations) |
| `sns.barplot` | Mean (or other) by category |
| `sns.pairplot` | Optional multi-scatter grid |
| `plt.subplots` / `plt.show` | Figure lifecycle |
| `ax.axvline` | Threshold line |
| `plt.tight_layout` | Avoid label clipping |

### Official docs (bookmark)

- Pandas user guide: https://pandas.pydata.org/docs/user_guide/10min.html  
- `DataFrame`: https://pandas.pydata.org/docs/reference/frame.html  
- Seaborn tutorial: https://seaborn.pydata.org/tutorial/introduction.html  
- Matplotlib: https://matplotlib.org/stable/users/explain/quick_start.html  

---

## 7. Insights template

Copy into the last Markdown cell and fill with **your** numbers:

```markdown
## Insights (Phase 1)

1. **Shape & quality:** The dataset has ___ rows and ___ columns. Missing values: ___. Duplicates: ___.
2. **Score distribution:** Mean ≈ ___, std ≈ ___. Scores look [symmetric / skewed left / skewed right / multimodal].
3. **At-risk balance:** ___ % of rows are at-risk (`score < 10`). This is [balanced / imbalanced] for classification.
4. **Strongest correlates with `today_eval_score`:** 1) ___ 2) ___ 3) ___ (from heatmap / sorted corr).
5. **Hints effect:** Higher `hints_used` tends to [lower / raise / not affect] scores — visible in [scatter/boxplot].
6. **Generator check:** Penalty group (solved < 3 & hints > 5) mean score = ___ vs others = ___.
7. **Persistence:** `previous_eval_score` is [strongly / weakly] related to today — matches the 0.6 weight in the formula.
8. **Implication for Phase 2:** I expect Random Forest to rely most on ___. Watch Recall because ___.

### One-sentence summary
Students who ___ are most at risk because ___.
```

---

## 8. Definition of Done + common mistakes

### Done when

- [ ] Kernel is `.venv` / EduCoach
- [ ] CSV loads; shape is `(264, 10)`
- [ ] Nulls = 0, student×day duplicates = 0, solved ≤ attempted
- [ ] Histogram of `today_eval_score` with threshold line at 10
- [ ] At-risk % computed and written in insights
- [ ] At least one scatter (hints or success_rate vs score)
- [ ] Correlation heatmap + sorted correlations with target
- [ ] Insights markdown filled with **your** observations
- [ ] Notebook runs **Restart & Run All** without errors

### Common mistakes

| Mistake | Fix |
|---------|-----|
| `FileNotFoundError` | Use `../data/processed/...` or `Path` relative to notebook |
| Wrong kernel (system Python) | Select `.venv` / EduCoach kernel |
| `SettingWithCopyWarning` | `df = df.copy()` before adding columns |
| `&` without parentheses | Always `(cond1) & (cond2)` |
| Correlation on `topic` string | Encode later; for now use numeric cols only |
| Stopping at plots | Insights cell is mandatory |

### After Phase 1

Ping me with:
1. Your filled **insights** (or a screenshot)
2. Any surprising number

Then we unlock **Phase 2 — Model Training** (baseline Linear Regression + Random Forest + save `.pkl`).

---

## Quick start commands (recap)

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
# open notebooks/01_EDA_and_Data_Gen.ipynb in Cursor
# select kernel Python (EduCoach)
# follow STEP 0 → STEP 9 in this guide
```

If the CSV is missing:

```bash
python data/synthetic/generate_data.py
```
