/*
  Warnings:

  - You are about to drop the column `nameId` on the `admin` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_nameId_fkey";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "nameId",
ADD COLUMN     "userAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "usuario"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
