-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "transcript_question_answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
