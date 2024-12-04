/*
  Warnings:

  - Made the column `transcriptId` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quoteId` on table `Bookmark` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bookmark" ALTER COLUMN "transcriptId" SET NOT NULL,
ALTER COLUMN "quoteId" SET NOT NULL;
