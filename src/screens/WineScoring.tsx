import { ArrowLeft } from "lucide-react";
import type { Wine, ScoringCriterion } from "../types/wine";
import { CriteriaScoring } from "../components/CriteriaScoring";
import { GlobalWineSummaryDialog } from "../components/GlobalWineSummaryDialog";
import { Button } from "../components/ui/button";
import { getMaxPossibleScore } from "../utils/wineUtils";
import categoriesImg from "../assets/categories.png";

interface WineScoringProps {
  wine: Wine;
  criteria: ScoringCriterion[];
  onScoreUpdate: (criterionId: string, score: number) => void;
  onCommentUpdate?: (criterionId: string, comment: string) => void;
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
  onCommentUpdate,
  onBack,
}: WineScoringProps) {
  const maxPossibleScore = getMaxPossibleScore(criteria);
  const scorePercentage =
    maxPossibleScore > 0 ? (wine.totalScore / maxPossibleScore) * 100 : 0;

  const style =
    categoryStyles[wine.category as keyof typeof categoryStyles] ||
    categoryStyles["Red Wine"];

  return (
    <>
      {/* Background Image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: `url(${categoriesImg}) center center / cover no-repeat`,
        }}
      />
      {/* Category Tint Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: `linear-gradient(135deg, ${style.backgroundColor} 0%, ${style.backgroundColor} 100%)`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100vw - 20px)",
          maxWidth: "440px",
          height: "calc(100vh - 60px)",
          overflowY: "auto",
          padding: "20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="scrollbar-hide"
      >
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

      {/* Wine Header Card */}
      <div
        className="rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl border border-white/20"
        style={{
          background: "rgba(255,255,255,0.9)",
          color: "#1f2937",
        }}
      >
        {/* Main Content */}
        <div className="text-center">
          {/* Wine ID */}
          <div className="mb-4">
            <div
              className="text-5xl font-light tracking-wider mb-2"
              style={{
                fontFamily: "serif",
                color: "#1f2937",
              }}
            >
              {wine.anonymousId}
            </div>

            {/* Wine Category */}
            <div
              className="text-lg font-light tracking-wide opacity-80"
              style={{ fontFamily: "serif" }}
            >
              {wine.category}
            </div>
          </div>
        </div>
      </div>

      {/* Criteria Cards */}
      <div className="space-y-4 mb-6">
        {criteria.map((criterion) => (
          <CriteriaScoring
            key={criterion.id}
            criterion={criterion}
            currentScore={wine.scores[criterion.id]}
            currentComment={wine.comments[criterion.id] || ""}
            onScoreChange={(score) => onScoreUpdate(criterion.id, score)}
            onCommentChange={onCommentUpdate ? (comment) => onCommentUpdate(criterion.id, comment) : undefined}
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
        <GlobalWineSummaryDialog
          wine={wine}
          criteria={criteria}
          onSubmit={() => {
            if (onBack) {
              onBack();
            }
          }}
        />
      </div>
        </div>
      </>
    );
  }
