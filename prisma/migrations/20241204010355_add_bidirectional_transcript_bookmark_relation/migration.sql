-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_transcriptId_fkey" FOREIGN KEY ("transcriptId") REFERENCES "transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;
