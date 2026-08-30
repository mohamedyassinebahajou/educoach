"use client";

import { useState } from "react";
import { ChatDrawer } from "@/components/chat/ChatDrawer";

type AskTutorButtonProps = {
  lessonSlug: string;
  lessonTitle: string;
};

export function AskTutorButton({ lessonSlug, lessonTitle }: AskTutorButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-semibold text-[var(--accent)] hover:brightness-95"
      >
        Ask Tutor about this page
      </button>
      <ChatDrawer
        mode="tutor"
        lessonSlug={lessonSlug}
        lessonTitle={lessonTitle}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
