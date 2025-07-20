export interface Wine {
  id: string;
  anonymousId: string;
  category: string;
  scores: Record<string, number>;
  comments: Record<string, string>;
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

export interface WineCategory {
  id: string;
  name: string;
  displayName: string;
  wines: Wine[];
  completedCount: number;
  totalCount: number;
}

export type WineStatus = "unscored" | "partial" | "complete";

export type NavigationView =
  | "category-selection"
  | "category-wine-list"
  | "wine-scoring";

export interface WineScoreUpdate {
  wineId: string;
  criterionId: string;
  score: number;
}
