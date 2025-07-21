import type { ScoringCriterion } from "../types/wine";
import { Textarea } from "./ui/textarea";
import "./CriteriaScoring.css";

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
      className="criteria-card"
      data-criterion={criterion.id}
    >
      {/* Header with title and score */}
      <div className="criteria-header">
        <h3 className="criteria-title">
          {criterion.name}
        </h3>
        {/* Score display - right aligned */}
        <span className="criteria-score">
          {currentScore || 0}/{criterion.maxScore}
        </span>
      </div>

      {/* Description */}
      <p className="criteria-description">
        {criterion.description}
      </p>

      {/* Slider */}
      <div className="criteria-slider">
        <input
          type="range"
          min="0"
          max={criterion.maxScore}
          value={currentScore || 0}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
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
        <div className="criteria-comments">
          <Textarea
            placeholder="Additional comments (optional)"
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
