import type { ScoringCriterion } from "../types/wine";
import { Textarea } from "./ui/textarea";

interface CriteriaScoringProps {
  criterion: ScoringCriterion;
  currentScore: number | undefined;
  onScoreChange: (score: number) => void;
  onCommentChange?: (comment: string) => void;
  currentComment?: string;
}

export function CriteriaScoring({
  criterion,
  currentScore,
  onScoreChange,
  onCommentChange,
  currentComment = "",
}: CriteriaScoringProps) {
  const handleSliderChange = (value: number) => {
    onScoreChange(value);
  };

  const scorePercentage = currentScore ? currentScore / criterion.maxScore : 0;

  return (
    <div 
      className="criterion-section mb-4 p-3 rounded-lg"
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(0,0,0,0.1)",
        color: "#000000",
      }}
      data-criterion={criterion.id}
    >
      {/* Header with title and score */}
      <div 
        className="flex justify-between items-center mb-2"
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          color: "#000000"
        }}
      >
        <h3 
          className="text-base font-semibold"
          style={{ color: "#000000" }}
        >
          {criterion.name}
        </h3>
        {/* Score display - right aligned */}
        <span 
          className="text-base font-semibold"
          style={{ color: "#000000" }}
        >
          {currentScore || 0}/{criterion.maxScore}
        </span>
      </div>

      {/* Description */}
      <p 
        className="text-xs mb-3 leading-relaxed"
        style={{ color: "#000000" }}
      >
        {criterion.description}
      </p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-blue-600"
            style={{ width: `${scorePercentage * 100}%` }}
          />
        </div>
      </div>

      {/* Slider */}
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max={criterion.maxScore}
          value={currentScore || 0}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
              scorePercentage * 100
            }%, #e5e7eb ${
              scorePercentage * 100
            }%, #e5e7eb 100%)`,
          }}
        />
      </div>

      {/* Comments Textarea */}
      {onCommentChange && (
        <div className="mt-2 w-full">
          <Textarea
            placeholder="Additional comments (optional)"
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="min-h-[60px] text-sm w-full"
            style={{ color: "#000000" }}
          />
        </div>
      )}
    </div>
  );
}
