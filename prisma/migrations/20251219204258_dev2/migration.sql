-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('user', 'escort');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'user';
