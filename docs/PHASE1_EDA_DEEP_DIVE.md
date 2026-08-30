# Phase 1 Deep Dive — EDA Theory & Practice (EduCoach)

**Companion:** synthetic-data deep dive (Phase 0) · [`PHASE1_CONCEPTS_EXPLAINED.md`](PHASE1_CONCEPTS_EXPLAINED.md) · [`PHASE1_EDA_GUIDE.md`](PHASE1_EDA_GUIDE.md)

**Your data:** `data/processed/student_performance.csv` → **264 rows** (24×11), **0 missing**, **0 duplicate rows**.

---

## 1. Is EDA a good / necessary approach?

**Yes — mandatory before ML.**

| Without EDA | Risk |
|-------------|------|
| Train immediately | Wrong target, leakage, garbage features |
| Skip quality checks | NaNs / bad types crash or silently bias the model |
| Skip class balance | High accuracy, useless at-risk detection |
| Skip correlations | Miss that `previous_eval` dominates; over-trust `day` |

**One-sentence defense:**  
“EDA is how we verify the synthetic generator behaves as designed and decide which signals the coach’s model should use.”

---

## 2. What is EDA? (theory)

**Exploratory Data Analysis** = systematic inspection of a dataset using:

1. **Tables** (shape, dtypes, describe, value counts)  
2. **Plots** (histograms, boxplots, scatter, heatmap)  
3. **Questions** (quality? distribution? relationships? balance?)

EDA is **not** training. It does **not** produce `random_forest.pkl`.  
It produces **understanding** and **modeling decisions**.

### Classic EDA loop

```text
Load → Clean/quality check → Univariate (one column)
     → Bivariate (two columns) → Multivariate (many)
     → Write insights → Decide features / metrics for Phase 2
```

---

## 3. Unit of analysis in EduCoach

Each **row** = one **student on one day** (panel observation).

```text
student_id=1, day=3, topic=loops,
exercises_solved=…, hints_used=…,
previous_eval_score=6.49, today_eval_score=11.26, at_risk=False
```

| Concept | EduCoach |
|---------|----------|
| Observation | Student-day |
| Feature | Activity + previous score + day/topic |
| Target | `today_eval_score` |
| Derived label | `at_risk = score < 10` |

---

## 4. Data quality concepts

### Missing values (NaN)
Empty cells. Models hate unexpected NaNs unless imputed.

**Yours:** `df.isna().sum().sum() == 0` → clean.

### Duplicates
Identical rows can overweight one case.

**Yours:** `df.duplicated().sum() == 0`.

### Types
- Numeric for scores/counts  
- `topic` as string/object (categorical)  
- `at_risk` as bool  

### Consistency rule (validate the generator)
```text
at_risk should always equal (today_eval_score < 10)
```
**Yours:** mismatch count = **0** → label is correctly derived.

### Domain constraints
- `exercises_solved_correctly ≤ exercises_attempted`  
- scores in `[0, 20]`  

EDA should verify these (and did, if you followed the guide).

---

## 5. Univariate analysis (one variable)

### Mean, median, std

| Stat | Meaning | Your `today_eval_score` |
|------|---------|-------------------------|
| **Mean** | Average | **≈ 9.21** |
| **Median (50%)** | Middle value | **≈ 9.00** |
| **Std** | Spread in score points | **≈ 5.76** |
| **Min / Max** | Extremes | **0 / 20** |

**Interpretation for the jury:**  
Scores center slightly **below 10**, with large spread → many students near the at-risk border. That matches a tough bootcamp story and stresses **recall**.

### Quantiles (`describe()`)
- Q1 (25%) ≈ **4.68** → bottom quarter scores ≤ ~4.7  
- Q3 (75%) ≈ **13.90** → top quarter ≥ ~13.9  
- **IQR** = Q3−Q1 ≈ 9.2 → wide middle spread  

### Histogram
Shows **shape** of the distribution (peak, skew, gaps).

### Boxplot
Shows median, box (IQR), whiskers, outlier dots — good for comparing groups (e.g. by topic).

### Videos
- [Mean, Variance, Std — StatQuest](https://www.youtube.com/watch?v=SzZ6GpcfoQY)  
- [EDA intro — Krish Naik](https://www.youtube.com/watch?v=xi0vhRW687w)  
- Search: `histogram vs boxplot explained`

---

## 6. Class balance (`at_risk`)

### Theory
For rare events, **accuracy is misleading**.

Example: 95% not at-risk → “always predict ok” → 95% accuracy, **0% recall** on the students you care about.

### Your numbers
| at_risk | Share |
|---------|-------|
| True | **≈ 53.8%** |
| False | **≈ 46.2%** |

**Almost balanced** — good for learning both classes.  
Slightly high vs a “happy” real cohort, but fine for PoC stress-testing the coach radar.

### Metric foreshadowing (Phase 2)
Coach priority = **Recall(at-risk)** = of truly struggling rows, how many we flag.

### Video
- Search: `precision recall StatQuest` or `class imbalance machine learning`

---

## 7. Bivariate analysis & correlation

### Scatter plot
Two numeric variables on X/Y.  
Example: `previous_eval_score` (X) vs `today_eval_score` (Y) → upward cloud if linked.

### Correlation (Pearson) — intuition
Number in **[-1, 1]**:

| Value | Meaning |
|-------|---------|
| near **+1** | rise together |
| near **0** | little linear link |
| near **−1** | one rises, other falls |

**Correlation ≠ causation**, but it guides feature usefulness.

### Your correlations with `today_eval_score`

| Feature | Corr | Reading |
|---------|------|---------|
| `exercises_solved_correctly` | **+0.63** | Strong positive |
| `previous_eval_score` | **+0.59** | Strong positive (time link!) |
| `success_rate` (solved/attempted) | **+0.72** | Strongest engineered signal |
| `hints_used` | **−0.24** | More hints ↔ lower scores |
| `day` | **−0.15** | Weak |
| `time_spent_minutes` | **≈ 0.05** | Almost none |

**Group check:**  
mean score when `hints_used > 5` ≈ **7.36** vs ≤5 ≈ **10.8** → matches the generator’s struggle penalty story.

### Heatmap
Color matrix of all pairwise correlations — one glance for Phase 2 feature discussion.

### Video
- Search: `correlation vs causation`  
- Search: `seaborn heatmap tutorial`

---

## 8. Categorical analysis (`topic`)

`topic` is **nominal** (no true order like “loops < lists”).

EDA tools:
- `value_counts()`  
- mean score **by topic/day**  

Your mean scores by day drift mildly (day 1 ~11.5 → later days often ~8–9).  
Because **day ↔ topic is 1:1**, `day` and `topic` carry overlapping calendar info → later RF finds `day` weak vs activity features.

---

## 9. Feature engineering preview (still EDA)

Creating `success_rate = solved / attempted` during EDA is allowed for **understanding**.  
In Phase 2 you may or may not feed it to the model (RF already has solved + attempted separately).

EDA insight: success_rate corr **0.72** explains why “solved” dominates feature importance later.

---

## 10. Leakage (critical theory)

**Leakage** = giving the model information it would not have at prediction time.

| Bad in X | Why |
|----------|-----|
| `today_eval_score` | That’s the target |
| `at_risk` | Derived from the target |

| OK in X | Why |
|---------|-----|
| `previous_eval_score` | Known before tonight’s eval |
| today’s activity counts | Known by afternoon |

EDA is where you **spot** leakage candidates before training.

---

## 11. What EDA decided for Phase 2 (bridge)

From your EDA you should conclude:

1. Keep **previous_eval_score**, **solved**, **hints**, attempted, time  
2. Encode **topic** as categorical (One-Hot)  
3. Don’t expect miracles from **day** alone  
4. Optimize / report **at-risk recall**, not only RMSE  
5. Data quality is good → safe to train  

That is the **practical output** of Phase 1.

---

## 12. Worked “story” example (tie to generator)

Student with:
- `previous_eval_score = 5`  
- `solved = 1`, `attempted = 5` → low success  
- `hints_used = 10`  

EDA expectation: low `today_eval_score`, `at_risk=True`.  
Generator: success term small + struggle penalty −4 → same story.  
EDA plots should show clouds of such points in the low-score region.

---

## 13. Pandas methods cheat sheet (practical)

| Code | Purpose |
|------|---------|
| `pd.read_csv(path)` | Load |
| `df.head()`, `df.shape`, `df.info()` | First look |
| `df.describe()` | Numeric summary |
| `df.isna().sum()` | Missing |
| `df.duplicated().sum()` | Dupes |
| `df['at_risk'].value_counts(normalize=True)` | Class balance |
| `df.corr(numeric_only=True)` | Correlations |
| `df.groupby('topic')['today_eval_score'].mean()` | Group means |
| `sns.histplot` / `sns.heatmap` / `sns.scatterplot` | Plots |

---

## 14. Video playlist (Phase 1)

| # | Topic | Link |
|---|--------|------|
| 1 | EDA intro | https://www.youtube.com/watch?v=xi0vhRW687w |
| 2 | Pandas crash | https://www.youtube.com/watch?v=vmEHCJofslg |
| 3 | Mean / var / std | https://www.youtube.com/watch?v=SzZ6GpcfoQY |
| 4 | Histograms / distributions | Search: `histogram explained statistics` |
| 5 | Boxplots | Search: `boxplot explained StatQuest` or similar |
| 6 | Correlation | Search: `StatQuest correlation` |
| 7 | Precision/recall preview | Search: `StatQuest precision recall` |

---

## 15. 60-second pitch (learn this)

“In Phase 1 I ran EDA on 264 synthetic student-day rows. Data was clean (no nulls/duplicates), evening scores average about 9.2 with large spread, and about 54% of rows are at-risk. Correlation analysis shows solved exercises and previous eval score are the strongest links to tonight’s score; heavy hint use associates with lower scores; day is weak. That validated the generator and guided Phase 2 features and the focus on at-risk recall.”

---

## 16. Self-check (answer out loud)

1. What is the unit of one row in EduCoach?  
2. Mean score ≈ ? At-risk share ≈ ?  
3. Two strongest correlates of `today_eval_score`?  
4. Why is `previous_eval_score` allowed but `at_risk` not, as a feature?  
5. What modeling decisions did EDA justify?  

---

## 17. Common jury questions

**Q: Why not jump to Random Forest?**  
A: Without EDA you can’t justify features, metrics, or trust the labels.

**Q: Is 54% at-risk realistic?**  
A: High vs a calm class; for PoC it stresses detection. Real OULAD rates differ — we’d rebalance or recalibrate later.

**Q: Why success_rate corr higher than solved alone?**  
A: It normalizes by attempts (2/2 vs 2/5 are different). RF can approximate that interaction from raw columns.

**Q: Did EDA prove the formula?**  
A: It **consistent with** the formula (previous↑, solved↑, hints↑ penalty). It doesn’t “prove” causality; it validates design.
