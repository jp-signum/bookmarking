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

export interface Bookmark {
  id: number;
  folderId: number;
  transcriptId: number;
  quoteId: number;
  createdAt: string;
  transcript?: {
    id: number;
    interview_name: string;
  };
  quote?: {
    question: string;
    answer: string;
  };
}

export interface Folder {
  id: number;
  name: string;
  createdAt: string;
  bookmarks: Bookmark[];
}