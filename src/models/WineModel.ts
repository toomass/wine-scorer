import type { Wine, ScoringCriterion, WineStatus } from "../types/wine";

export class WineModel implements Wine {
  public id: string;
  public anonymousId: string;
  public category: string;
  public scores: Record<string, number>;
  public comments: Record<string, string>;
  public totalScore: number;
  public isComplete: boolean;
  private criteria: ScoringCriterion[];

  constructor(
    id: string,
    anonymousId: string,
    category: string,
    criteria: ScoringCriterion[],
    scores: Record<string, number> = {},
    comments: Record<string, string> = {}
  ) {
    this.id = id;
    this.anonymousId = anonymousId;
    this.category = category;
    this.criteria = criteria;
    this.scores = scores;
    this.comments = comments;
    this.totalScore = this.calculateTotal();
    this.isComplete = this.getCompletionStatus() === "complete";
  }

  updateScore(criterionId: string, score: number): void {
    const criterion = this.criteria.find((c) => c.id === criterionId);
    if (!criterion) {
      throw new Error(`Criterion with id ${criterionId} not found`);
    }

    if (!this.isValidScore(score, criterion.maxScore)) {
      throw new Error(
        `Score ${score} is not valid for criterion ${criterionId}. Must be between 0 and ${criterion.maxScore}`
      );
    }

    this.scores[criterionId] = score;
    this.totalScore = this.calculateTotal();
    this.isComplete = this.getCompletionStatus() === "complete";
  }

  calculateTotal(): number {
    return Object.values(this.scores).reduce((sum, score) => sum + score, 0);
  }

  getCompletionStatus(): WineStatus {
    const scoredCriteriaCount = this.getScoredCriteriaCount();

    if (scoredCriteriaCount === 0) {
      return "unscored";
    } else if (scoredCriteriaCount === this.criteria.length) {
      return "complete";
    } else {
      return "partial";
    }
  }

  getScoredCriteriaCount(): number {
    return Object.keys(this.scores).length;
  }

  getMaxPossibleScore(): number {
    return this.criteria.reduce(
      (sum, criterion) => sum + criterion.maxScore,
      0
    );
  }

  getScorePercentage(): number {
    const maxScore = this.getMaxPossibleScore();
    return maxScore > 0 ? (this.totalScore / maxScore) * 100 : 0;
  }

  private isValidScore(score: number, maxScore: number): boolean {
    return score >= 0 && score <= maxScore && Number.isInteger(score);
  }

  // Static factory method to create WineModel from plain Wine object
  static fromWine(wine: Wine, criteria: ScoringCriterion[]): WineModel {
    return new WineModel(
      wine.id,
      wine.anonymousId,
      wine.category,
      criteria,
      wine.scores,
      wine.comments
    );
  }

  // Convert back to plain Wine object
  toWine(): Wine {
    return {
      id: this.id,
      anonymousId: this.anonymousId,
      category: this.category,
      scores: { ...this.scores },
      comments: { ...this.comments },
      totalScore: this.totalScore,
      isComplete: this.isComplete,
    };
  }
}
