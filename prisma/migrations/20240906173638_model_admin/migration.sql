/*
  Warnings:

  - You are about to drop the column `userEmail` on the `admin` table. All the data in the column will be lost.
  - Added the required column `userId` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_userEmail_fkey";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
