-- AlterTable
ALTER TABLE "User" ADD COLUMN     "maxUnlockedDay" INTEGER;

-- CreateTable
CREATE TABLE "CohortSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "maxUnlockedDay" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CohortSettings_pkey" PRIMARY KEY ("id")
);
