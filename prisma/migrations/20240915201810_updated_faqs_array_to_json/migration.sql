/*
  Warnings:

  - The `faqsArray` column on the `Articles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "faqsArray",
ADD COLUMN     "faqsArray" JSONB[];
