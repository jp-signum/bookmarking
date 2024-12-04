/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookmarkFolder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_transcriptId_fkey";

-- DropTable
DROP TABLE "Bookmark";

-- DropTable
DROP TABLE "BookmarkFolder";

-- CreateTable
CREATE TABLE "bookmarkFolder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarkFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark" (
    "id" SERIAL NOT NULL,
    "folderId" INTEGER NOT NULL,
    "transcriptId" INTEGER NOT NULL,
    "quoteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookmarkFolder_name_key" ON "bookmarkFolder"("name");

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "bookmarkFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;
