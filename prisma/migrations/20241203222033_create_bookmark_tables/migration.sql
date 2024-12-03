-- CreateTable
CREATE TABLE "transcript" (
    "id" SERIAL NOT NULL,
    "interview_name" TEXT,

    CONSTRAINT "transcript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transcript_question_answer" (
    "id" SERIAL NOT NULL,
    "transcript_id" INTEGER,
    "question" TEXT,
    "answer" TEXT,

    CONSTRAINT "transcript_question_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkFolder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookmarkFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "folderId" INTEGER NOT NULL,
    "transcriptId" INTEGER,
    "quoteId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transcript_question_answer" ADD CONSTRAINT "transcript_question_answer_transcript_id_fkey" FOREIGN KEY ("transcript_id") REFERENCES "transcript"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "BookmarkFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
