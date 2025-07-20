import type { ScoringCriterion } from "../types/wine";

interface CriteriaScoringProps {
  criterion: ScoringCriterion;
  currentScore: number | undefined;
  onScoreChange: (score: number) => void;
}

export function CriteriaScoring({
  criterion,
  currentScore,
  onScoreChange,
}: CriteriaScoringProps) {
  const handleSliderChange = (value: number) => {
    onScoreChange(value);
  };

  const scorePercentage = currentScore ? currentScore / criterion.maxScore : 0;

  return (
    <div className="criterion-section">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-gray-900">
          {criterion.name}
        </h3>
        <span className="text-lg font-medium text-gray-700">
          {currentScore || 0}/{criterion.maxScore}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-white/40 rounded-full h-3 mb-2">
          <div
            className="bg-red-900/80 h-3 rounded-full transition-all duration-300"
            style={{ width: `${scorePercentage * 100}%` }}
          />
        </div>
      </div>

      {/* Description */}
      {criterion.description && (
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {criterion.description}
        </p>
      )}

      {/* Score Input */}
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <input
            type="range"
            min="0"
            max={criterion.maxScore}
            value={currentScore || 0}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer touch-slider"
            style={{
              background: `linear-gradient(to right, #7f1d1d 0%, #7f1d1d ${
                scorePercentage * 100
              }%, rgba(255,255,255,0.4) ${
                scorePercentage * 100
              }%, rgba(255,255,255,0.4) 100%)`,
            }}
          />
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[60px] text-center touch-target border border-white/20">
          <span className="text-2xl font-bold text-gray-900">
            {currentScore || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
