import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";
import { getUserByEmail, getUserById } from "~/models/user.server";

const prisma = new PrismaClient();

async function seed() {
  const password = process.env.PASSWORD;
  const email = process.env.ADMIN_EMAIL;

  invariant(password, "PASSWORD is not set to ENV");
  invariant(email, "ADMIN_EMAIL is not set to ENV");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const registeredUser = await prisma.user.findUnique({ where: { email } })

  if (!registeredUser) {
    console.error(`The user with email ${email} does not exist.`)
    process.exit()
  }
  console.log(registeredUser)

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
