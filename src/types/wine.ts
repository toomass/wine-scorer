export interface Wine {
  id: string;
  anonymousId: string;
  category: string;
  scores: Record<string, number>;
  totalScore: number;
  isComplete: boolean;
}

export interface ScoringCriterion {
  id: string;
  name: string;
  maxScore: number;
  description?: string;
}

export interface TastingConfig {
  wines: Wine[];
  criteria: ScoringCriterion[];
  sessionName: string;
}

export type WineStatus = "unscored" | "partial" | "complete";

export interface WineScoreUpdate {
  wineId: string;
  criterionId: string;
  score: number;
}
