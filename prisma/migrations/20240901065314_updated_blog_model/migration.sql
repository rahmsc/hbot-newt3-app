/*
  Warnings:

  - Added the required column `subIntroduction` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "subIntroduction" TEXT NOT NULL;
