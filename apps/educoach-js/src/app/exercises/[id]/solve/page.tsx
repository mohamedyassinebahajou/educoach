import { notFound } from "next/navigation";
import { SolveWorkspace } from "@/components/exercises/SolveWorkspace";
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

  return <SolveWorkspace exercise={exercise} />;
}
