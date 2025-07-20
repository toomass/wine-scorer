import type { Wine, ScoringCriterion } from "../types/wine";
import { CriteriaScoring } from "./CriteriaScoring";
import { getMaxPossibleScore } from "../utils/wineUtils";

interface WineScoringProps {
  wine: Wine;
  criteria: ScoringCriterion[];
  onScoreUpdate: (criterionId: string, score: number) => void;
}

export function WineScoring({
  wine,
  criteria,
  onScoreUpdate,
}: WineScoringProps) {
  const maxPossibleScore = getMaxPossibleScore(criteria);
  const scorePercentage =
    maxPossibleScore > 0 ? (wine.totalScore / maxPossibleScore) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Header Card */}
      <div className="wine-header">
        <div className="wine-header-decoration"></div>
        <h1 className="wine-header-title">
          <div className="wine-id">{wine.anonymousId}</div>
          <div className="wine-category">{wine.category}</div>
        </h1>
        <div className="wine-header-accent"></div>
      </div>

      {/* Criteria Cards */}
      <div className="space-y-4 mb-6">
        {criteria.map((criterion) => (
          <CriteriaScoring
            key={criterion.id}
            criterion={criterion}
            currentScore={wine.scores[criterion.id]}
            onScoreChange={(score) => onScoreUpdate(criterion.id, score)}
          />
        ))}
      </div>

      {/* Final Score Section */}
      <div className="final-score-section">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Final Score
        </h2>
        <div className="text-center mb-4">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            {wine.totalScore}
            <span className="text-2xl text-gray-500">/{maxPossibleScore}</span>
          </div>
          <div className="text-lg text-gray-600">Overall Wine Rating</div>
        </div>

        {/* Overall Progress Bar */}
        <div className="w-full bg-white/40 rounded-full h-4 mb-4">
          <div
            className="bg-red-900/80 h-4 rounded-full transition-all duration-500"
            style={{ width: `${scorePercentage}%` }}
          />
        </div>

        <p className="text-center text-gray-700 text-sm mb-6">
          Complete wine evaluation based on all scoring criteria
        </p>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-8 mb-8">
        <button
          className="submit-score-btn"
          onClick={() => {
            // TODO: Handle score submission
            alert(
              `Score submitted for ${wine.anonymousId}: ${wine.totalScore}/${maxPossibleScore} points`
            );
          }}
        >
          Submit Score
        </button>
      </div>
    </div>
  );
}
