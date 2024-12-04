export interface Transcript {
  id: string;
  interview_name: string;
}

export interface TranscriptQA {
  id: number;
  transcript_id: string;
  question: string;
  answer: string;
}

export interface TranscriptWithQA {
  transcript: Transcript;
  quotes: TranscriptQA[];
}
