import {
  defaultScoringCriteria,
  generateSampleWines,
  createDefaultTastingConfig,
  createCustomCriteria,
  getCriteriaSet,
  createWinesWithCategories,
  validateTastingConfig,
  alternativeCriteriaSets,
} from "../sampleWines";
import type { TastingConfig } from "../../types/wine";

describe("sampleWines", () => {
  describe("defaultScoringCriteria", () => {
    it("should have correct default criteria", () => {
      expect(defaultScoringCriteria).toHaveLength(4);
      expect(defaultScoringCriteria[0]).toEqual({
        id: "color",
        name: "Color",
        maxScore: 20,
        description: "Visual appearance, clarity, and color intensity",
      });
    });

    it("should have valid max scores", () => {
      const totalMaxScore = defaultScoringCriteria.reduce(
        (sum, criterion) => sum + criterion.maxScore,
        0
      );
      expect(totalMaxScore).toBe(100); // 20 + 30 + 25 + 25
    });
  });

  describe("generateSampleWines", () => {
    it("should generate correct number of wines", () => {
      const wines = generateSampleWines(5);
      expect(wines).toHaveLength(5);
    });

    it("should generate wines with unique IDs and anonymous IDs", () => {
      const wines = generateSampleWines(8);
      const ids = wines.map((w) => w.id);
      const anonymousIds = wines.map((w) => w.anonymousId);

      expect(new Set(ids).size).toBe(8);
      expect(new Set(anonymousIds).size).toBe(8);
    });

    it("should generate wines with proper anonymous ID format", () => {
      const wines = generateSampleWines(3);
      expect(wines[0].anonymousId).toBe("Wine A");
      expect(wines[1].anonymousId).toBe("Wine B");
      expect(wines[2].anonymousId).toBe("Wine C");
    });

    it("should generate wines with categories", () => {
      const wines = generateSampleWines(8);
      wines.forEach((wine) => {
        expect(wine.category).toBeTruthy();
        expect(typeof wine.category).toBe("string");
      });
    });

    it("should generate wines with empty scores initially", () => {
      const wines = generateSampleWines(3);
      wines.forEach((wine) => {
        expect(wine.scores).toEqual({});
        expect(wine.totalScore).toBe(0);
        expect(wine.isComplete).toBe(false);
      });
    });
  });

  describe("createDefaultTastingConfig", () => {
    it("should create config with default values", () => {
      const config = createDefaultTastingConfig();

      expect(config.wines).toHaveLength(8);
      expect(config.criteria).toEqual(defaultScoringCriteria);
      expect(config.sessionName).toBe("Wine Blind Tasting Session");
    });

    it("should create config with custom wine count", () => {
      const config = createDefaultTastingConfig(5);
      expect(config.wines).toHaveLength(5);
    });

    it("should create config with custom session name", () => {
      const config = createDefaultTastingConfig(8, "Custom Session");
      expect(config.sessionName).toBe("Custom Session");
    });
  });

  describe("createCustomCriteria", () => {
    it("should create criteria from config", () => {
      const criteriaConfig = [
        { id: "test1", name: "Test 1", maxScore: 50 },
        {
          id: "test2",
          name: "Test 2",
          maxScore: 50,
          description: "Test description",
        },
      ];

      const criteria = createCustomCriteria(criteriaConfig);

      expect(criteria).toHaveLength(2);
      expect(criteria[0]).toEqual({
        id: "test1",
        name: "Test 1",
        maxScore: 50,
        description: undefined,
      });
      expect(criteria[1]).toEqual({
        id: "test2",
        name: "Test 2",
        maxScore: 50,
        description: "Test description",
      });
    });
  });

  describe("getCriteriaSet", () => {
    it("should return simple criteria set", () => {
      const criteria = getCriteriaSet("simple");
      expect(criteria).toHaveLength(3);
      expect(criteria[0].id).toBe("appearance");
    });

    it("should return professional criteria set", () => {
      const criteria = getCriteriaSet("professional");
      expect(criteria).toHaveLength(5);
      expect(criteria[0].id).toBe("color");
    });

    it("should return competition criteria set", () => {
      const criteria = getCriteriaSet("competition");
      expect(criteria).toHaveLength(4);
      expect(criteria[0].id).toBe("visual");
    });
  });

  describe("createWinesWithCategories", () => {
    it("should create wines with specified categories", () => {
      const categories = ["Red Wine", "White Wine", "Rosé Wine"];
      const config = createWinesWithCategories(categories);

      expect(config.wines).toHaveLength(3);
      expect(config.wines[0].category).toBe("Red Wine");
      expect(config.wines[1].category).toBe("White Wine");
      expect(config.wines[2].category).toBe("Rosé Wine");
    });

    it("should use custom session name", () => {
      const config = createWinesWithCategories(["Red Wine"], "Custom Session");
      expect(config.sessionName).toBe("Custom Session");
    });
  });

  describe("validateTastingConfig", () => {
    it("should return no errors for valid config", () => {
      const config = createDefaultTastingConfig();
      const errors = validateTastingConfig(config);
      expect(errors).toEqual([]);
    });

    it("should return error for missing session name", () => {
      const config = createDefaultTastingConfig();
      config.sessionName = "";

      const errors = validateTastingConfig(config);
      expect(errors).toContain("Session name is required");
    });

    it("should return error for no wines", () => {
      const config: TastingConfig = {
        wines: [],
        criteria: defaultScoringCriteria,
        sessionName: "Test",
      };

      const errors = validateTastingConfig(config);
      expect(errors).toContain("At least one wine is required");
    });

    it("should return error for no criteria", () => {
      const config = createDefaultTastingConfig();
      config.criteria = [];

      const errors = validateTastingConfig(config);
      expect(errors).toContain("At least one scoring criterion is required");
    });

    it("should return error for duplicate wine IDs", () => {
      const config = createDefaultTastingConfig(2);
      config.wines[1].id = config.wines[0].id;

      const errors = validateTastingConfig(config);
      expect(errors.some((error) => error.includes("Duplicate wine ID"))).toBe(
        true
      );
    });

    it("should return error for duplicate anonymous IDs", () => {
      const config = createDefaultTastingConfig(2);
      config.wines[1].anonymousId = config.wines[0].anonymousId;

      const errors = validateTastingConfig(config);
      expect(
        errors.some((error) => error.includes("Duplicate anonymous ID"))
      ).toBe(true);
    });

    it("should return error for missing wine category", () => {
      const config = createDefaultTastingConfig(1);
      config.wines[0].category = "";

      const errors = validateTastingConfig(config);
      expect(errors).toContain("Wine 1 is missing category");
    });

    it("should return error for duplicate criterion IDs", () => {
      const config = createDefaultTastingConfig();
      config.criteria[1].id = config.criteria[0].id;

      const errors = validateTastingConfig(config);
      expect(
        errors.some((error) => error.includes("Duplicate criterion ID"))
      ).toBe(true);
    });
  });

  describe("alternativeCriteriaSets", () => {
    it("should have all expected criteria sets", () => {
      expect(alternativeCriteriaSets.simple).toBeDefined();
      expect(alternativeCriteriaSets.professional).toBeDefined();
      expect(alternativeCriteriaSets.competition).toBeDefined();
    });

    it("should have valid total scores for each set", () => {
      Object.values(alternativeCriteriaSets).forEach((criteriaSet) => {
        const totalScore = criteriaSet.reduce(
          (sum, criterion) => sum + criterion.maxScore,
          0
        );
        expect(totalScore).toBe(100);
      });
    });
  });
});
