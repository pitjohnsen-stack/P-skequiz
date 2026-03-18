export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctOptionIndex: number | number[];
}

export enum GameState {
  START = 'START',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR'
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
}