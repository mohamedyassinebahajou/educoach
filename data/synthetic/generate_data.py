"""Generate synthetic student performance data for EduCoach AI.

Produces 24 students x 11 days (264 rows) with features and targets
suitable for Random Forest regression and at-risk classification.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd

# Compact SAS topic list (one concept per day)
TOPICS: list[str] = [
    "variables",
    "conditions",
    "loops",
    "lists",
    "functions",
    "dictionaries",
    "oop_classes",
    "oop_inheritance",
    "error_handling",
    "files",
    "final_project",
]

N_STUDENTS: int = 24
N_DAYS: int = len(TOPICS)  # 11 days — one topic per day
DEFAULT_SEED: int = 42


def _clip_score(score: float) -> float:
    """Clamp a score to the valid [0, 20] range."""
    return float(np.clip(score, 0.0, 20.0))


def generate_student_performance(
    n_students: int = N_STUDENTS,
    n_days: int = N_DAYS,
    seed: int = DEFAULT_SEED,
) -> pd.DataFrame:
    """Generate synthetic daily performance records for a SAS cohort.

    Args:
        n_students: Number of students (default 24).
        n_days: Number of training days (default 11).
        seed: Random seed for reproducibility.

    Returns:
        DataFrame with features, ``today_eval_score``, and ``at_risk``.
    """
    rng = np.random.default_rng(seed)
    rows: list[dict[str, object]] = []

    # Baseline ability per student (some stronger, some weaker)
    student_ability = rng.normal(loc=12.0, scale=3.0, size=n_students)
    student_ability = np.clip(student_ability, 5.0, 18.0)

    for student_id in range(1, n_students + 1):
        previous_eval_score = float(student_ability[student_id - 1])

        for day in range(1, n_days + 1):
            topic = TOPICS[day - 1] if day <= len(TOPICS) else f"day_{day}"

            exercises_attempted = int(rng.integers(1, 6))  # 1–5
            # Solved count cannot exceed attempted
            max_solved = exercises_attempted
            exercises_solved = int(rng.integers(0, max_solved + 1))
            hints_used = int(rng.integers(0, 11))  # 0–10
            time_spent_minutes = int(rng.integers(15, 121))  # 15–120

            success_rate = exercises_solved / exercises_attempted
            noise = float(rng.normal(0.0, 1.5))

            # Spec formula
            today_eval_score = (
                previous_eval_score * 0.6
                + success_rate * 10.0
                + noise
            )

            # Struggling penalty
            if exercises_solved < 3 and hints_used > 5:
                today_eval_score -= 4.0

            # Mild ability drift so strong/weak students stay coherent
            today_eval_score += (student_ability[student_id - 1] - 12.0) * 0.15
            today_eval_score = _clip_score(round(today_eval_score, 2))

            at_risk = today_eval_score < 10.0

            rows.append(
                {
                    "student_id": student_id,
                    "day": day,
                    "topic": topic,
                    "exercises_attempted": exercises_attempted,
                    "exercises_solved_correctly": exercises_solved,
                    "hints_used": hints_used,
                    "time_spent_minutes": time_spent_minutes,
                    "previous_eval_score": round(previous_eval_score, 2),
                    "today_eval_score": today_eval_score,
                    "at_risk": at_risk,
                }
            )

            previous_eval_score = today_eval_score

    return pd.DataFrame(rows)


def save_dataset(df: pd.DataFrame, output_path: Path) -> Path:
    """Persist the dataset as CSV, creating parent directories if needed.

    Args:
        df: Generated performance DataFrame.
        output_path: Destination CSV path.

    Returns:
        Absolute path to the written file.
    """
    output_path = output_path.resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)
    return output_path


def main() -> None:
    """CLI entrypoint for synthetic data generation."""
    parser = argparse.ArgumentParser(
        description="Generate EduCoach AI synthetic student performance data."
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).resolve().parents[2]
        / "data"
        / "processed"
        / "student_performance.csv",
        help="Output CSV path (default: data/processed/student_performance.csv)",
    )
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    parser.add_argument("--students", type=int, default=N_STUDENTS)
    parser.add_argument("--days", type=int, default=N_DAYS)
    args = parser.parse_args()

    df = generate_student_performance(
        n_students=args.students,
        n_days=args.days,
        seed=args.seed,
    )
    path = save_dataset(df, args.output)

    n_at_risk = int(df["at_risk"].sum())
    print(f"Generated {len(df)} rows → {path}")
    print(f"Students: {args.students} | Days: {args.days}")
    print(f"At-risk rows: {n_at_risk} ({100 * n_at_risk / len(df):.1f}%)")
    print(f"Score mean: {df['today_eval_score'].mean():.2f} | std: {df['today_eval_score'].std():.2f}")


if __name__ == "__main__":
    main()
