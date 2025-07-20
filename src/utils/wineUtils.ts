import type { Wine, ScoringCriterion, WineStatus } from "../types/wine";

/**
 * Calculate total score for a wine based on its individual criterion scores
 */
export function calculateWineTotal(scores: Record<string, number>): number {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}

/**
 * Calculate total score - alias for calculateWineTotal for consistency
 */
export function calculateTotalScore(scores: Record<string, number>): number {
  return calculateWineTotal(scores);
}

/**
 * Determine the completion status of a wine based on scored criteria
 */
export function getWineStatus(
  wine: Wine,
  criteria: ScoringCriterion[]
): WineStatus {
  const scoredCriteriaCount = Object.keys(wine.scores).length;

  if (scoredCriteriaCount === 0) {
    return "unscored";
  } else if (scoredCriteriaCount === criteria.length) {
    return "complete";
  } else {
    return "partial";
  }
}

/**
 * Get the number of criteria that have been scored for a wine
 */
export function getScoredCriteriaCount(wine: Wine): number {
  return Object.keys(wine.scores).length;
}

/**
 * Calculate the maximum possible score for a set of criteria
 */
export function getMaxPossibleScore(criteria: ScoringCriterion[]): number {
  return criteria.reduce((sum, criterion) => sum + criterion.maxScore, 0);
}

/**
 * Calculate the percentage score for a wine
 */
export function getWineScorePercentage(
  wine: Wine,
  criteria: ScoringCriterion[]
): number {
  const maxScore = getMaxPossibleScore(criteria);
  return maxScore > 0 ? (wine.totalScore / maxScore) * 100 : 0;
}

/**
 * Validate if a score is within the valid range for a criterion
 */
export function isValidScore(score: number, maxScore: number): boolean {
  return score >= 0 && score <= maxScore && Number.isInteger(score);
}

/**
 * Generate an anonymous ID for a wine (e.g., "Wine A", "Wine B", etc.)
 */
export function generateAnonymousId(index: number): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return `Wine ${letters[index % letters.length]}`;
}

/**
 * Validate wine data structure
 */
export function validateWine(
  wine: Wine,
  criteria: ScoringCriterion[]
): string[] {
  const errors: string[] = [];

  if (!wine.id || wine.id.trim() === "") {
    errors.push("Wine ID is required");
  }

  if (!wine.anonymousId || wine.anonymousId.trim() === "") {
    errors.push("Anonymous ID is required");
  }

  if (!wine.category || wine.category.trim() === "") {
    errors.push("Wine category is required");
  }

  // Validate scores
  Object.entries(wine.scores).forEach(([criterionId, score]) => {
    const criterion = criteria.find((c) => c.id === criterionId);
    if (!criterion) {
      errors.push(`Invalid criterion ID: ${criterionId}`);
    } else if (!isValidScore(score, criterion.maxScore)) {
      errors.push(
        `Invalid score ${score} for criterion ${criterion.name}. Must be between 0 and ${criterion.maxScore}`
      );
    }
  });

  return errors;
}

/**
 * Validate scoring criterion data structure
 */
export function validateScoringCriterion(
  criterion: ScoringCriterion
): string[] {
  const errors: string[] = [];

  if (!criterion.id || criterion.id.trim() === "") {
    errors.push("Criterion ID is required");
  }

  if (!criterion.name || criterion.name.trim() === "") {
    errors.push("Criterion name is required");
  }

  if (!Number.isInteger(criterion.maxScore) || criterion.maxScore <= 0) {
    errors.push("Max score must be a positive integer");
  }

  return errors;
}

/**
 * Create a new wine with default values
 */
export function createEmptyWine(
  id: string,
  anonymousId: string,
  category: string
): Wine {
  return {
    id,
    anonymousId,
    category,
    scores: {},
    totalScore: 0,
    isComplete: false,
  };
}
