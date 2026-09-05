-- Add AI grader feedback to attempts
ALTER TABLE "Attempt" ADD COLUMN IF NOT EXISTS "aiFeedback" TEXT;
