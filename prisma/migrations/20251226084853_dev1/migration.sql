/*
  Warnings:

  - Added the required column `age` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyType` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethnicity` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInCall` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceOutCall` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skinTone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "bodyType" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "ethnicity" TEXT NOT NULL,
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "priceInCall" INTEGER NOT NULL,
ADD COLUMN     "priceOutCall" INTEGER NOT NULL,
ADD COLUMN     "servicesOffered" TEXT[],
ADD COLUMN     "skinTone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "escort_reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "reviewedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "escort_reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "escort_reviews" ADD CONSTRAINT "escort_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
