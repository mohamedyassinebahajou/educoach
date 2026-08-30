import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/db";

async function main() {
  const password = await bcrypt.hash("student123", 10);
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

  for (let i = 1; i <= 5; i++) {
    const username = `student${i}`;
    await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        passwordHash: password,
        role: "learner",
        displayName: `Student ${i}`,
      },
    });
  }

  console.log("Seeded users:");
  console.log("  coach / coach123");
  console.log("  student1…student5 / student123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
