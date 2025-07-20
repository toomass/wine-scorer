import type { Wine, ScoringCriterion } from "../types/wine";
import { getWineStatus } from "../utils/wineUtils";
import { getCategoryStyle } from "../styles/wineProperties";
import { sharedCardStyle } from "../styles/sharedCardStyle";

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
      {/* Progress Summary Card */}
      <div
        style={{
          ...sharedCardStyle.cardStyle,
          background: "rgba(255,255,255,0.9)",
          padding: "24px",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Wine Tasting Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div 
            className="text-center p-4 rounded-lg border"
            style={{
              background: "rgba(34, 197, 94, 0.1)",
              borderColor: "rgba(34, 197, 94, 0.3)",
            }}
          >
            <div className="text-3xl font-bold text-green-600">
              {completedWines}
            </div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div 
            className="text-center p-4 rounded-lg border"
            style={{
              background: "rgba(234, 179, 8, 0.1)",
              borderColor: "rgba(234, 179, 8, 0.3)",
            }}
          >
            <div className="text-3xl font-bold text-yellow-600">
              {partialWines}
            </div>
            <div className="text-sm text-yellow-700">In Progress</div>
          </div>
          <div 
            className="text-center p-4 rounded-lg border"
            style={{
              background: "rgba(107, 114, 128, 0.1)",
              borderColor: "rgba(107, 114, 128, 0.3)",
            }}
          >
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

      {/* Wine Cards */}
      <div className="space-y-4">
        {wines.map((wine) => {
          const categoryStyle = getCategoryStyle(wine.category);
          const status = getWineStatus(wine, criteria);
          const scoredCount = Object.keys(wine.scores).length;
          const totalCriteria = criteria.length;
          
          return (
            <div
              key={wine.id}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                ...sharedCardStyle.cardStyle,
                background: categoryStyle.backgroundColor,
                color: categoryStyle.textColor,
                padding: "20px",
                minHeight: "120px",
              }}
              onClick={() => onWineSelect(wine.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold" style={{ color: categoryStyle.textColor }}>
                      {wine.anonymousId}
                    </h3>
                    <div className="text-sm px-2 py-1 rounded-full" style={{
                      background: status === "complete" ? "rgba(34, 197, 94, 0.2)" : 
                                status === "partial" ? "rgba(234, 179, 8, 0.2)" : 
                                "rgba(107, 114, 128, 0.2)",
                      color: categoryStyle.textColor,
                    }}>
                      {status === "complete" ? "Complete" : 
                       status === "partial" ? "In Progress" : "Not Started"}
                    </div>
                  </div>
                  
                  <div className="text-sm opacity-75 mb-3" style={{ color: categoryStyle.textColor }}>
                    {wine.category}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ opacity: 0.8 }}>Progress:</span>
                      <span className="font-medium">
                        {scoredCount}/{totalCriteria} criteria
                      </span>
                    </div>

                    {status !== "unscored" && (
                      <div className="flex justify-between text-sm">
                        <span style={{ opacity: 0.8 }}>Current Score:</span>
                        <span className="font-bold text-lg">{wine.totalScore}</span>
                      </div>
                    )}

                    <div className="w-full bg-black/20 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: status === "complete" ? "100%" : `${(scoredCount / totalCriteria) * 100}%`,
                          backgroundColor: status === "complete" ? "rgba(34, 197, 94, 0.8)" : 
                                        status === "partial" ? "rgba(234, 179, 8, 0.8)" : 
                                        "rgba(107, 114, 128, 0.8)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Session Complete Message */}
      {completedWines === wines.length && wines.length > 0 && (
        <div
          style={{
            ...sharedCardStyle.cardStyle,
            background: "rgba(34, 197, 94, 0.1)",
            borderColor: "rgba(34, 197, 94, 0.3)",
            padding: "24px",
            textAlign: "center",
          }}
        >
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
