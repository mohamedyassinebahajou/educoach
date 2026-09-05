import { notFound, redirect } from "next/navigation";
import { SolveWorkspace } from "@/components/exercises/SolveWorkspace";
import { getSession } from "@/lib/auth";
import { assertLearnerCanAccessExerciseDay } from "@/lib/dayAccess";
import { exercises, getExercise } from "@/lib/exercises";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return exercises.map((e) => ({ id: e.id }));
}

export default async function ExerciseSolvePage({ params }: PageProps) {
  const { id } = await params;
  const exercise = getExercise(id);
  if (!exercise) notFound();

  const user = await getSession();
  if (user?.role === "learner") {
    const allowed = await assertLearnerCanAccessExerciseDay(user.id, exercise.day);
    if (!allowed) redirect(`/learn/locked?day=${exercise.day}`);
  }

  return <SolveWorkspace exercise={exercise} />;
}
