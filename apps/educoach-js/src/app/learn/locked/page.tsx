import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { formatMessage } from "@/lib/i18n/messages";
import { getI18n } from "@/lib/i18n/server";

type PageProps = {
  searchParams: Promise<{ day?: string }>;
};

export default async function LearnLockedPage({ searchParams }: PageProps) {
  const { t } = await getI18n();
  const params = await searchParams;
  const day = params.day ?? "?";

  return (
    <PageShell title={t.coach.dayLockedTitle} subtitle={formatMessage(t.coach.dayLockedBody, { n: day })}>
      <Link href="/learn" className="text-sm text-[var(--accent)] hover:underline">
        {t.lesson.backToLearn}
      </Link>
    </PageShell>
  );
}
