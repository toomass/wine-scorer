import { useState } from "react";
import type { Wine, ScoringCriterion } from "./types/wine";
import { WineScoring } from "./components/WineScoring";
import { calculateTotalScore } from "./utils/wineUtils";

// Test data
const initialWine: Wine = {
  id: "1",
  anonymousId: "Wine A",
  category: "Red Wine",
  scores: {},
  totalScore: 0,
  isComplete: false,
};

const testCriteria: ScoringCriterion[] = [
  {
    id: "color",
    name: "Color",
    maxScore: 20,
    description:
      "Assess depth, clarity, and hue. Look for appropriate intensity and any flaws.",
  },
  {
    id: "aroma",
    name: "Aroma",
    maxScore: 30,
    description:
      "Evaluate fruit, fermentation, and aging notes. Consider intensity and complexity.",
  },
  {
    id: "taste",
    name: "Taste",
    maxScore: 30,
    description:
      "Judge acidity, tannins, body, and balance. Assess flavor complexity and integration.",
  },
  {
    id: "finish",
    name: "Finish",
    maxScore: 20,
    description:
      "Consider length and quality of aftertaste. Note lingering flavors and impression.",
  },
];

function App() {
  const [wine, setWine] = useState<Wine>(initialWine);

  const handleScoreUpdate = (criterionId: string, score: number) => {
    setWine((prevWine) => {
      const updatedScores = { ...prevWine.scores, [criterionId]: score };
      const totalScore = calculateTotalScore(updatedScores);
      const isComplete =
        Object.keys(updatedScores).length === testCriteria.length;

      return {
        ...prevWine,
        scores: updatedScores,
        totalScore,
        isComplete,
      };
    });
  };

  const handleBack = () => {
    // For now, just reset the wine - in a full app this would navigate back to wine list
    console.log("Back button clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto">
        <WineScoring
          wine={wine}
          criteria={testCriteria}
          onScoreUpdate={handleScoreUpdate}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}

export default App;
