/*
  Warnings:

  - Added the required column `urlImage` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "urlImage" TEXT NOT NULL;
