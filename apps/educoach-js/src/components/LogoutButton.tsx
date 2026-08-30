"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";

export function LogoutButton() {
  const router = useRouter();
  const { t } = useI18n();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-md border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--ink)] hover:bg-[var(--paper)]"
    >
      {t.nav.logout}
    </button>
  );
}
