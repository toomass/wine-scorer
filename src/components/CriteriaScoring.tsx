import type { ScoringCriterion } from "../types/wine";
import { WineIcon } from "./WineIcon";

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
    <div className="criterion-section" data-criterion={criterion.id}>
      {/* Clean flexbox layout - no overlapping */}
      <div className="flex gap-6 mb-6">
        {/* Wine Icon Component */}
        <WineIcon criterionId={criterion.id} size={100} />

        {/* Content area */}
        <div className="flex-1">
          {/* Score display */}
          <div className="flex justify-end mb-3">
            <span className="text-white text-lg font-bold">
              {currentScore || 0}/{criterion.maxScore}
            </span>
          </div>

          {/* Description */}
          <p className="text-white text-sm opacity-90 leading-relaxed">
            {criterion.description}
          </p>
        </div>
      </div>

      {/* Progress bar - full width */}
      <div className="mb-4">
        <div className="w-full bg-black bg-opacity-20 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300 bg-white bg-opacity-80"
            style={{ width: `${scorePercentage * 100}%` }}
          />
        </div>
      </div>

      {/* Slider - full width */}
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max={criterion.maxScore}
          value={currentScore || 0}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="flex-1 h-3 rounded-lg appearance-none cursor-pointer touch-slider"
          style={{
            background: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${
              scorePercentage * 100
            }%, rgba(0,0,0,0.2) ${
              scorePercentage * 100
            }%, rgba(0,0,0,0.2) 100%)`,
          }}
        />
        <div className="bg-white bg-opacity-90 rounded-lg px-3 py-2 min-w-[50px] text-center shadow-sm">
          <span className="text-xl font-bold text-gray-900">
            {currentScore || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
