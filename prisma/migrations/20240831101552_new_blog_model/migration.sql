-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "category1" TEXT NOT NULL,
    "category2" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "subheading1" TEXT NOT NULL,
    "body1" TEXT NOT NULL,
    "subheading2" TEXT NOT NULL,
    "body2" TEXT NOT NULL,
    "subheading3" TEXT NOT NULL,
    "body3" TEXT NOT NULL,
    "subheading4" TEXT NOT NULL,
    "body4" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "faqs" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);
