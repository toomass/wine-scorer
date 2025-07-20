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
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(0,0,0,0.1)",
        color: "#000000",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "16px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2)",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      data-criterion={criterion.id}
    >
      {/* Header with title and score */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "8px",
          color: "#000000"
        }}
      >
        <h3 
          style={{ 
            color: "#000000",
            fontSize: "1rem",
            fontWeight: "600"
          }}
        >
          {criterion.name}
        </h3>
        {/* Score display - right aligned */}
        <span 
          style={{ 
            color: "#000000 !important",
            fontSize: "1.125rem",
            fontWeight: "700"
          }}
        >
          {currentScore || 0}/{criterion.maxScore}
        </span>
      </div>

      {/* Description */}
      <p 
        style={{ 
          color: "#000000",
          fontSize: "0.75rem",
          marginBottom: "12px",
          lineHeight: "1.5"
        }}
      >
        {criterion.description}
      </p>

      {/* Slider */}
      <div style={{ marginBottom: "12px" }}>
        <input
          type="range"
          min="0"
          max={criterion.maxScore}
          value={currentScore || 0}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "8px",
            appearance: "none",
            cursor: "pointer",
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
        <div style={{ marginTop: "8px", width: "100%" }}>
          <Textarea
            placeholder="Additional comments (optional)"
            value={currentComment}
            onChange={(e) => onCommentChange(e.target.value)}
            style={{ 
              color: "#000000",
              minHeight: "60px",
              fontSize: "0.875rem",
              width: "100%"
            }}
          />
        </div>
      )}
    </div>
  );
}
