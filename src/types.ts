export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  lastReviewed: Date | null;
  nextReview: Date | null;
  difficultyRating: number | null;
}