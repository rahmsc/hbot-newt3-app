-- CreateTable
CREATE TABLE "Emails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "pressureUsed" TEXT NOT NULL,
    "numberOfTreatments" TEXT NOT NULL,
    "outcomes" TEXT NOT NULL,
    "studyLink" TEXT NOT NULL,
    "publishedDate" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "faqs" TEXT NOT NULL,
    "conflictsOfInterest" TEXT NOT NULL,
    "funding" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);
