import type { Wine, ScoringCriterion } from "../types/wine";
import { WineCard } from "./WineCard";
import { getWineStatus } from "../utils/wineUtils";

interface WineListProps {
  wines: Wine[];
  criteria: ScoringCriterion[];
  onWineSelect: (wineId: string) => void;
}

export function WineList({ wines, criteria, onWineSelect }: WineListProps) {
  const completedWines = wines.filter(
    (wine) => getWineStatus(wine, criteria) === "complete"
  ).length;
  const partialWines = wines.filter(
    (wine) => getWineStatus(wine, criteria) === "partial"
  ).length;
  const unscoredWines = wines.filter(
    (wine) => getWineStatus(wine, criteria) === "unscored"
  ).length;

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold mb-4">Wine Tasting Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl font-bold text-green-600">
              {completedWines}
            </div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-600">
              {partialWines}
            </div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-gray-600">
              {unscoredWines}
            </div>
            <div className="text-sm text-gray-700">Not Started</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>
              {completedWines}/{wines.length} wines completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedWines / wines.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Wine Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wines.map((wine) => (
          <WineCard
            key={wine.id}
            wine={wine}
            criteria={criteria}
            onClick={() => onWineSelect(wine.id)}
          />
        ))}
      </div>

      {/* Session Complete Message */}
      {completedWines === wines.length && wines.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-xl font-bold mb-2">
            🎉 Tasting Session Complete!
          </div>
          <div className="text-green-700">
            You have successfully scored all {wines.length} wines. You can still
            go back and modify any scores if needed.
          </div>
        </div>
      )}
    </div>
  );
}
