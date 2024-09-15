/*
  Warnings:

  - You are about to drop the `Blogs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Emails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imgLink` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "faqsArray" TEXT[],
ADD COLUMN     "imgLink" TEXT NOT NULL;

-- DropTable
DROP TABLE "Blogs";

-- CreateIndex
CREATE UNIQUE INDEX "Emails_email_key" ON "Emails"("email");
