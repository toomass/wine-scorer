import { WineModel } from "../WineModel";
import type { ScoringCriterion } from "../../types/wine";

describe("WineModel", () => {
  const mockCriteria: ScoringCriterion[] = [
    { id: "color", name: "Color", maxScore: 20 },
    { id: "aroma", name: "Aroma", maxScore: 30 },
    { id: "mouthfeel", name: "Mouthfeel", maxScore: 25 },
  ];

  describe("constructor", () => {
    it("should create a wine model with empty scores", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(wine.id).toBe("1");
      expect(wine.anonymousId).toBe("Wine A");
      expect(wine.category).toBe("Red");
      expect(wine.scores).toEqual({});
      expect(wine.totalScore).toBe(0);
      expect(wine.isComplete).toBe(false);
    });

    it("should create a wine model with existing scores", () => {
      const existingScores = { color: 15, aroma: 25 };
      const wine = new WineModel(
        "1",
        "Wine A",
        "Red",
        mockCriteria,
        existingScores
      );

      expect(wine.scores).toEqual(existingScores);
      expect(wine.totalScore).toBe(40);
      expect(wine.isComplete).toBe(false);
    });
  });

  describe("updateScore", () => {
    it("should update a score and recalculate totals", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      wine.updateScore("color", 18);

      expect(wine.scores.color).toBe(18);
      expect(wine.totalScore).toBe(18);
      expect(wine.isComplete).toBe(false);
    });

    it("should throw error for invalid criterion", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(() => wine.updateScore("invalid", 10)).toThrow(
        "Criterion with id invalid not found"
      );
    });

    it("should throw error for invalid score", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(() => wine.updateScore("color", 25)).toThrow(
        "Score 25 is not valid for criterion color"
      );
      expect(() => wine.updateScore("color", -5)).toThrow(
        "Score -5 is not valid for criterion color"
      );
    });

    it("should mark wine as complete when all criteria are scored", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      wine.updateScore("color", 18);
      wine.updateScore("aroma", 25);
      wine.updateScore("mouthfeel", 20);

      expect(wine.isComplete).toBe(true);
      expect(wine.totalScore).toBe(63);
    });
  });

  describe("calculateTotal", () => {
    it("should calculate correct total score", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria, {
        color: 15,
        aroma: 28,
        mouthfeel: 22,
      });

      expect(wine.calculateTotal()).toBe(65);
    });

    it("should return 0 for empty scores", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(wine.calculateTotal()).toBe(0);
    });
  });

  describe("getCompletionStatus", () => {
    it("should return unscored for no scores", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(wine.getCompletionStatus()).toBe("unscored");
    });

    it("should return partial for some scores", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria, {
        color: 15,
      });

      expect(wine.getCompletionStatus()).toBe("partial");
    });

    it("should return complete for all scores", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria, {
        color: 15,
        aroma: 28,
        mouthfeel: 22,
      });

      expect(wine.getCompletionStatus()).toBe("complete");
    });
  });

  describe("getScoredCriteriaCount", () => {
    it("should return correct count of scored criteria", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria, {
        color: 15,
        aroma: 28,
      });

      expect(wine.getScoredCriteriaCount()).toBe(2);
    });
  });

  describe("getMaxPossibleScore", () => {
    it("should calculate maximum possible score", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(wine.getMaxPossibleScore()).toBe(75); // 20 + 30 + 25
    });
  });

  describe("getScorePercentage", () => {
    it("should calculate correct percentage", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria, {
        color: 15,
        aroma: 30,
        mouthfeel: 25,
      });

      expect(wine.getScorePercentage()).toBe(93.33333333333333); // 70/75 * 100
    });

    it("should return 0 for no scores", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria);

      expect(wine.getScorePercentage()).toBe(0);
    });
  });

  describe("static methods", () => {
    it("should create WineModel from Wine object", () => {
      const wineData = {
        id: "1",
        anonymousId: "Wine A",
        category: "Red",
        scores: { color: 15 },
        totalScore: 15,
        isComplete: false,
      };

      const wine = WineModel.fromWine(wineData, mockCriteria);

      expect(wine.id).toBe("1");
      expect(wine.scores.color).toBe(15);
      expect(wine.totalScore).toBe(15);
    });

    it("should convert WineModel to Wine object", () => {
      const wine = new WineModel("1", "Wine A", "Red", mockCriteria, {
        color: 15,
      });
      const wineData = wine.toWine();

      expect(wineData).toEqual({
        id: "1",
        anonymousId: "Wine A",
        category: "Red",
        scores: { color: 15 },
        totalScore: 15,
        isComplete: false,
      });
    });
  });
});
