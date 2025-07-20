import { ArrowLeft } from "lucide-react";
import type { Wine, ScoringCriterion } from "../types/wine";
import { CriteriaScoring } from "./CriteriaScoring";
import { Button } from "./ui/button";
import { getMaxPossibleScore } from "../utils/wineUtils";

interface WineScoringProps {
  wine: Wine;
  criteria: ScoringCriterion[];
  onScoreUpdate: (criterionId: string, score: number) => void;
  onBack?: () => void;
}

// Same color mapping as CategoryCard
const categoryStyles = {
  "Red Wine": {
    backgroundColor: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
    textColor: "#ffffff",
  },
  "White Wine": {
    backgroundColor: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
    textColor: "#1f2937",
  },
  "Rosé Wine": {
    backgroundColor: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)",
    textColor: "#1f2937",
  },
  "Sparkling Wine": {
    backgroundColor: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
    textColor: "#1f2937",
  },
  "Dessert Wine": {
    backgroundColor: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
    textColor: "#1f2937",
  },
  "Fortified Wine": {
    backgroundColor: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
    textColor: "#ffffff",
  },
};

export function WineScoring({
  wine,
  criteria,
  onScoreUpdate,
  onBack,
}: WineScoringProps) {
  const maxPossibleScore = getMaxPossibleScore(criteria);
  const scorePercentage =
    maxPossibleScore > 0 ? (wine.totalScore / maxPossibleScore) * 100 : 0;

  const style =
    categoryStyles[wine.category as keyof typeof categoryStyles] ||
    categoryStyles["Red Wine"];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Back Button */}
      {onBack && (
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Wine List</span>
          </Button>
        </div>
      )}

      {/* Fancy Header Card */}
      <div
        className="rounded-3xl p-12 mb-8 relative overflow-hidden shadow-2xl border border-white/20"
        style={{
          background: style.backgroundColor,
          color: style.textColor,
        }}
      >
        {/* Decorative Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 45v9h-6v6h12v-6h-6v-9a6 6 0 0 0 6-6V6H24v33a6 6 0 0 0 6 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Elegant Border Accent */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />

        {/* Main Content */}
        <div className="text-center relative z-10">
          {/* Wine ID with elegant styling */}
          <div className="mb-6">
            <div
              className="text-7xl font-extralight tracking-wider mb-3 drop-shadow-lg"
              style={{
                fontFamily: "serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {wine.anonymousId}
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-px bg-current opacity-40" />
              <div className="mx-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-60"
                >
                  <path d="M12 15v6M8 21h8M12 15a4 4 0 0 0 4-4V3H8v8a4 4 0 0 0 4 4z" />
                </svg>
              </div>
              <div className="w-8 h-px bg-current opacity-40" />
            </div>

            {/* Wine Category with elegant typography */}
            <div
              className="text-xl font-light tracking-wide opacity-90"
              style={{ fontFamily: "serif" }}
            >
              {wine.category}
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
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
