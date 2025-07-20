import type { Wine, ScoringCriterion, TastingConfig } from "../types/wine";
import { createEmptyWine, generateAnonymousId } from "../utils/wineUtils";

// Default scoring criteria for wine tasting
export const defaultScoringCriteria: ScoringCriterion[] = [
  {
    id: "color",
    name: "Color",
    maxScore: 20,
    description: "Visual appearance, clarity, and color intensity",
  },
  {
    id: "aroma",
    name: "Aroma",
    maxScore: 30,
    description: "Nose, bouquet, and aromatic complexity",
  },
  {
    id: "mouthfeel",
    name: "Mouthfeel",
    maxScore: 25,
    description: "Texture, body, tannins, and overall palate sensation",
  },
  {
    id: "flavor",
    name: "Flavor",
    maxScore: 25,
    description: "Taste profile, balance, and flavor complexity",
  },
];

// Wine categories for blind tasting
export const wineCategories = [
  "Red Wine",
  "White Wine",
  "Rosé Wine",
  "Sparkling Wine",
  "Dessert Wine",
  "Fortified Wine",
] as const;

export type WineCategory = (typeof wineCategories)[number];

// Sample wine data for testing and demonstration
const sampleWineData = [
  { category: "Red Wine", realName: "Cabernet Sauvignon Reserve 2019" },
  { category: "Red Wine", realName: "Pinot Noir Estate 2020" },
  { category: "White Wine", realName: "Chardonnay Barrel Select 2021" },
  { category: "White Wine", realName: "Sauvignon Blanc 2022" },
  { category: "Red Wine", realName: "Merlot Single Vineyard 2018" },
  { category: "Rosé Wine", realName: "Provence Rosé 2022" },
  { category: "Sparkling Wine", realName: "Brut Champagne NV" },
  { category: "White Wine", realName: "Riesling Late Harvest 2021" },
];

/**
 * Generate sample wines for a tasting session
 */
export function generateSampleWines(count: number = 8): Wine[] {
  const wines: Wine[] = [];

  for (let i = 0; i < count; i++) {
    const wineData = sampleWineData[i % sampleWineData.length];
    const wine = createEmptyWine(
      `wine-${i + 1}`,
      generateAnonymousId(i),
      wineData.category
    );
    wines.push(wine);
  }

  return wines;
}

/**
 * Create a default tasting configuration
 */
export function createDefaultTastingConfig(
  wineCount: number = 8,
  sessionName: string = "Wine Blind Tasting Session"
): TastingConfig {
  return {
    wines: generateSampleWines(wineCount),
    criteria: defaultScoringCriteria,
    sessionName,
  };
}

/**
 * Create custom scoring criteria
 */
export function createCustomCriteria(
  criteriaConfig: Array<{
    id: string;
    name: string;
    maxScore: number;
    description?: string;
  }>
): ScoringCriterion[] {
  return criteriaConfig.map((config) => ({
    id: config.id,
    name: config.name,
    maxScore: config.maxScore,
    description: config.description,
  }));
}

/**
 * Alternative scoring criteria sets for different tasting styles
 */
export const alternativeCriteriaSets = {
  // Simple 3-factor scoring
  simple: [
    {
      id: "appearance",
      name: "Appearance",
      maxScore: 25,
      description: "Visual assessment",
    },
    {
      id: "aroma",
      name: "Aroma",
      maxScore: 35,
      description: "Nose and bouquet",
    },
    {
      id: "taste",
      name: "Taste",
      maxScore: 40,
      description: "Overall flavor and finish",
    },
  ],

  // Detailed professional scoring
  professional: [
    {
      id: "color",
      name: "Color",
      maxScore: 15,
      description: "Hue, intensity, clarity",
    },
    {
      id: "nose",
      name: "Nose",
      maxScore: 25,
      description: "Aroma intensity and quality",
    },
    {
      id: "palate",
      name: "Palate",
      maxScore: 25,
      description: "Flavor, balance, structure",
    },
    {
      id: "finish",
      name: "Finish",
      maxScore: 20,
      description: "Length and quality of finish",
    },
    {
      id: "overall",
      name: "Overall Quality",
      maxScore: 15,
      description: "General impression",
    },
  ],

  // Competition style scoring
  competition: [
    {
      id: "visual",
      name: "Visual",
      maxScore: 20,
      description: "Appearance and presentation",
    },
    {
      id: "olfactory",
      name: "Olfactory",
      maxScore: 30,
      description: "Aroma and bouquet",
    },
    {
      id: "gustatory",
      name: "Gustatory",
      maxScore: 30,
      description: "Taste and mouthfeel",
    },
    {
      id: "harmony",
      name: "Harmony",
      maxScore: 20,
      description: "Balance and integration",
    },
  ],
};

/**
 * Get predefined criteria set by name
 */
export function getCriteriaSet(
  setName: keyof typeof alternativeCriteriaSets
): ScoringCriterion[] {
  return createCustomCriteria(alternativeCriteriaSets[setName]);
}

/**
 * Create wines with specific categories
 */
export function createWinesWithCategories(
  categories: string[],
  sessionName: string = "Custom Wine Tasting"
): TastingConfig {
  const wines = categories.map((category, index) =>
    createEmptyWine(`wine-${index + 1}`, generateAnonymousId(index), category)
  );

  return {
    wines,
    criteria: defaultScoringCriteria,
    sessionName,
  };
}

/**
 * Validate tasting configuration
 */
export function validateTastingConfig(config: TastingConfig): string[] {
  const errors: string[] = [];

  if (!config.sessionName || config.sessionName.trim() === "") {
    errors.push("Session name is required");
  }

  if (!config.wines || config.wines.length === 0) {
    errors.push("At least one wine is required");
  }

  if (!config.criteria || config.criteria.length === 0) {
    errors.push("At least one scoring criterion is required");
  }

  // Validate each wine has unique ID and anonymous ID
  const wineIds = new Set();
  const anonymousIds = new Set();

  config.wines.forEach((wine, index) => {
    if (wineIds.has(wine.id)) {
      errors.push(`Duplicate wine ID: ${wine.id}`);
    }
    wineIds.add(wine.id);

    if (anonymousIds.has(wine.anonymousId)) {
      errors.push(`Duplicate anonymous ID: ${wine.anonymousId}`);
    }
    anonymousIds.add(wine.anonymousId);

    if (!wine.category || wine.category.trim() === "") {
      errors.push(`Wine ${index + 1} is missing category`);
    }
  });

  // Validate each criterion has unique ID
  const criterionIds = new Set();
  config.criteria.forEach((criterion) => {
    if (criterionIds.has(criterion.id)) {
      errors.push(`Duplicate criterion ID: ${criterion.id}`);
    }
    criterionIds.add(criterion.id);
  });

  return errors;
}
