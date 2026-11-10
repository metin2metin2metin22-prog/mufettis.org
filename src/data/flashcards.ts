import flashcardsData from './flashcards.json';

export interface Flashcard {
  id: number;
  slug: string;
  category: string;
  catSlug: 'masak' | 'spl' | 'cia' | 'banka';
  tag: string;
  title: string;
  question: string;
  answer: string;
  legalNote: string;
}

export const flashcards: Flashcard[] = flashcardsData as Flashcard[];
