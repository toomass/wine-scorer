import { useState, useCallback } from "react";
import type { Wine, ScoringCriterion, TastingConfig } from "../types/wine";
import { WineList } from "./WineList";
import { WineScoring } from "./WineScoring";
import { WineModel } from "../models/WineModel";
import { calculateWineTotal } from "../utils/wineUtils";

interface TastingSessionProps {
  config: TastingConfig;
}

type ViewState = "list" | "scoring";

export function TastingSession({ config }: TastingSessionProps) {
  const [wines, setWines] = useState<Wine[]>(config.wines);
  const [currentView, setCurrentView] = useState<ViewState>("list");
  const [selectedWineId, setSelectedWineId] = useState<string | null>(null);

  const selectedWine = selectedWineId
    ? wines.find((w) => w.id === selectedWineId)
    : null;

  const handleWineSelect = useCallback((wineId: string) => {
    setSelectedWineId(wineId);
    setCurrentView("scoring");
  }, []);

  const handleBackToList = useCallback(() => {
    setCurrentView("list");
    setSelectedWineId(null);
  }, []);

  const handleScoreUpdate = useCallback(
    (criterionId: string, score: number) => {
      if (!selectedWineId) return;

      setWines((prevWines) =>
        prevWines.map((wine) => {
          if (wine.id === selectedWineId) {
            // Create a WineModel to handle the update logic
            const wineModel = WineModel.fromWine(wine, config.criteria);

            try {
              wineModel.updateScore(criterionId, score);
              return wineModel.toWine();
            } catch (error) {
              console.error("Error updating score:", error);
              return wine; // Return unchanged wine if update fails
            }
          }
          return wine;
        })
      );
    },
    [selectedWineId, config.criteria]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Session Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {config.sessionName}
          </h1>
          <p className="text-gray-600">
            {currentView === "list"
              ? `${wines.length} wines • ${config.criteria.length} scoring criteria`
              : selectedWine
              ? `Scoring ${selectedWine.anonymousId} (${selectedWine.category})`
              : "Wine Scoring"}
          </p>
        </div>

        {/* Main Content */}
        {currentView === "list" ? (
          <WineList
            wines={wines}
            criteria={config.criteria}
            onWineSelect={handleWineSelect}
          />
        ) : selectedWine ? (
          <WineScoring
            wine={selectedWine}
            criteria={config.criteria}
            onScoreUpdate={handleScoreUpdate}
            onBack={handleBackToList}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No wine selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
