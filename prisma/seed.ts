import { Role } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import "dotenv/config";

const seedUsers = [
  {
    name: "Alice Admin",
    email: "alice@prisma.io",
    password: "password123",
    role: Role.admin,
  },
  {
    name: "Bob User",
    email: "bob@prisma.io",
    password: "password123",
    role: Role.user,
  },
];

export async function main() {
  console.log("Start seeding...");

  for (const userData of seedUsers) {
    try {
      const user = await auth.api.createUser({
        body: {
          email: userData.email,
          password: userData.password,
          name: userData.name,
          role: userData.role,
        },
      });
      console.log(`Created user: ${user?.user?.name} (${user?.user?.email})`);
    } catch (error) {
      console.error(`Failed to create user ${userData.email}:`, error);
    }
  }

  console.log("Seeding finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
