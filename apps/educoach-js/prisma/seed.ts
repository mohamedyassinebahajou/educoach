import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/db";

async function main() {
  const coachPassword = await bcrypt.hash("coach123", 10);

  await prisma.user.upsert({
    where: { username: "coach" },
    update: {},
    create: {
      username: "coach",
      passwordHash: coachPassword,
      role: "coach",
      displayName: "Coach",
    },
  });

  await prisma.cohortSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, maxUnlockedDay: 3 },
  });

  console.log("Seeded users:");
  console.log("  coach / coach123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
