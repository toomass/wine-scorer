import {
  calculateWineTotal,
  getWineStatus,
  getScoredCriteriaCount,
  getMaxPossibleScore,
  getWineScorePercentage,
  isValidScore,
  generateAnonymousId,
  validateWine,
  validateScoringCriterion,
  createEmptyWine,
} from "../wineUtils";
import type { Wine, ScoringCriterion } from "../../types/wine";

describe("wineUtils", () => {
  const mockCriteria: ScoringCriterion[] = [
    { id: "color", name: "Color", maxScore: 20 },
    { id: "aroma", name: "Aroma", maxScore: 30 },
    { id: "mouthfeel", name: "Mouthfeel", maxScore: 25 },
  ];

  const mockWine: Wine = {
    id: "1",
    anonymousId: "Wine A",
    category: "Red",
    scores: { color: 15, aroma: 25 },
    comments: {},
    totalScore: 40,
    isComplete: false,
  };

  describe("calculateWineTotal", () => {
    it("should calculate correct total from scores", () => {
      const scores = { color: 15, aroma: 25, mouthfeel: 20 };
      expect(calculateWineTotal(scores)).toBe(60);
    });

    it("should return 0 for empty scores", () => {
      expect(calculateWineTotal({})).toBe(0);
    });
  });

  describe("getWineStatus", () => {
    it("should return unscored for wine with no scores", () => {
      const wine = { ...mockWine, scores: {} };
      expect(getWineStatus(wine, mockCriteria)).toBe("unscored");
    });

    it("should return partial for wine with some scores", () => {
      expect(getWineStatus(mockWine, mockCriteria)).toBe("partial");
    });

    it("should return complete for wine with all scores", () => {
      const wine = {
        ...mockWine,
        scores: { color: 15, aroma: 25, mouthfeel: 20 },
      };
      expect(getWineStatus(wine, mockCriteria)).toBe("complete");
    });
  });

  describe("getScoredCriteriaCount", () => {
    it("should return correct count of scored criteria", () => {
      expect(getScoredCriteriaCount(mockWine)).toBe(2);
    });

    it("should return 0 for wine with no scores", () => {
      const wine = { ...mockWine, scores: {} };
      expect(getScoredCriteriaCount(wine)).toBe(0);
    });
  });

  describe("getMaxPossibleScore", () => {
    it("should calculate maximum possible score", () => {
      expect(getMaxPossibleScore(mockCriteria)).toBe(75); // 20 + 30 + 25
    });

    it("should return 0 for empty criteria", () => {
      expect(getMaxPossibleScore([])).toBe(0);
    });
  });

  describe("getWineScorePercentage", () => {
    it("should calculate correct percentage", () => {
      const wine = { ...mockWine, totalScore: 60 };
      expect(getWineScorePercentage(wine, mockCriteria)).toBe(80); // 60/75 * 100
    });

    it("should return 0 for wine with no score", () => {
      const wine = { ...mockWine, totalScore: 0 };
      expect(getWineScorePercentage(wine, mockCriteria)).toBe(0);
    });
  });

  describe("isValidScore", () => {
    it("should return true for valid scores", () => {
      expect(isValidScore(0, 20)).toBe(true);
      expect(isValidScore(10, 20)).toBe(true);
      expect(isValidScore(20, 20)).toBe(true);
    });

    it("should return false for invalid scores", () => {
      expect(isValidScore(-1, 20)).toBe(false);
      expect(isValidScore(21, 20)).toBe(false);
      expect(isValidScore(10.5, 20)).toBe(false);
    });
  });

  describe("generateAnonymousId", () => {
    it("should generate correct anonymous IDs", () => {
      expect(generateAnonymousId(0)).toBe("Wine A");
      expect(generateAnonymousId(1)).toBe("Wine B");
      expect(generateAnonymousId(25)).toBe("Wine Z");
      expect(generateAnonymousId(26)).toBe("Wine A"); // wraps around
    });
  });

  describe("validateWine", () => {
    it("should return no errors for valid wine", () => {
      const errors = validateWine(mockWine, mockCriteria);
      expect(errors).toEqual([]);
    });

    it("should return errors for invalid wine", () => {
      const invalidWine: Wine = {
        id: "",
        anonymousId: "",
        category: "",
        scores: { invalid: 10, color: 25 },
        comments: {},
        totalScore: 35,
        isComplete: false,
      };

      const errors = validateWine(invalidWine, mockCriteria);
      expect(errors).toContain("Wine ID is required");
      expect(errors).toContain("Anonymous ID is required");
      expect(errors).toContain("Wine category is required");
      expect(errors).toContain("Invalid criterion ID: invalid");
      expect(errors).toContain(
        "Invalid score 25 for criterion Color. Must be between 0 and 20"
      );
    });
  });

  describe("validateScoringCriterion", () => {
    it("should return no errors for valid criterion", () => {
      const criterion: ScoringCriterion = {
        id: "test",
        name: "Test Criterion",
        maxScore: 20,
      };

      const errors = validateScoringCriterion(criterion);
      expect(errors).toEqual([]);
    });

    it("should return errors for invalid criterion", () => {
      const invalidCriterion: ScoringCriterion = {
        id: "",
        name: "",
        maxScore: -5,
      };

      const errors = validateScoringCriterion(invalidCriterion);
      expect(errors).toContain("Criterion ID is required");
      expect(errors).toContain("Criterion name is required");
      expect(errors).toContain("Max score must be a positive integer");
    });
  });

  describe("createEmptyWine", () => {
    it("should create wine with default values", () => {
      const wine = createEmptyWine("1", "Wine A", "Red");

      expect(wine).toEqual({
        id: "1",
        anonymousId: "Wine A",
        category: "Red",
        scores: {},
        comments: {},
        totalScore: 0,
        isComplete: false,
      });
    });
  });
});
