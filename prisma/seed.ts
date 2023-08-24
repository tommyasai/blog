import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

async function seed() {
  const password = process.env.PASSWORD;
  const email = process.env.EMAIL;

  invariant(password, "Password is not set to ENV");
  invariant(email, "Email is not set to ENV");

  const hashedPassword = await bcrypt.hash(password, 10);

  prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
