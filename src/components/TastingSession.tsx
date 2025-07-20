import { useState, useCallback } from "react";
import type {
  Wine,
  TastingConfig,
  WineCategory,
  NavigationView,
} from "../types/wine";
import { CategorySelection } from "./CategorySelection";
import { CategoryWineList } from "./CategoryWineList";
import { WineScoring } from "./WineScoring";
import { WineModel } from "../models/WineModel";
import { updateCategoryProgress } from "../data/sampleWines";

interface TastingSessionProps {
  config: TastingConfig & { categories: WineCategory[] };
}

export function TastingSession({ config }: TastingSessionProps) {
  const [wines, setWines] = useState<Wine[]>(config.wines);
  const [categories, setCategories] = useState<WineCategory[]>(
    config.categories
  );
  const [currentView, setCurrentView] =
    useState<NavigationView>("category-selection");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedWineId, setSelectedWineId] = useState<string | null>(null);

  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId)
    : null;

  const selectedWine = selectedWineId
    ? wines.find((w) => w.id === selectedWineId)
    : null;

  const categoryWines = selectedCategory
    ? wines.filter((wine) => wine.category === selectedCategory.name)
    : [];

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentView("category-wine-list");
  }, []);

  const handleWineSelect = useCallback((wineId: string) => {
    setSelectedWineId(wineId);
    setCurrentView("wine-scoring");
  }, []);

  const handleBackToCategories = useCallback(() => {
    setSelectedCategoryId(null);
    setCurrentView("category-selection");
  }, []);

  const handleBackToCategoryWines = useCallback(() => {
    setSelectedWineId(null);
    setCurrentView("category-wine-list");
  }, []);

  const handleScoreUpdate = useCallback(
    (criterionId: string, score: number) => {
      if (!selectedWineId) return;

      setWines((prevWines) => {
        const updatedWines = prevWines.map((wine) => {
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
        });

        // Update categories with new progress
        setCategories((prevCategories) =>
          updateCategoryProgress(prevCategories, updatedWines)
        );

        return updatedWines;
      });
    },
    [selectedWineId, config.criteria]
  );

  return (
    <>
      {/* Category Selection - Full Screen */}
      {currentView === "category-selection" && (
        <CategorySelection
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {/* Other Views - Container Layout */}
      {currentView !== "category-selection" && (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            {currentView === "category-wine-list" && selectedCategory && (
              <CategoryWineList
                category={selectedCategory}
                wines={categoryWines}
                criteria={config.criteria}
                onWineSelect={handleWineSelect}
                onBack={handleBackToCategories}
              />
            )}

            {currentView === "wine-scoring" && selectedWine && (
              <WineScoring
                wine={selectedWine}
                criteria={config.criteria}
                onScoreUpdate={handleScoreUpdate}
                onBack={handleBackToCategoryWines}
              />
            )}

            {/* Fallback for invalid states */}
            {((currentView === "category-wine-list" && !selectedCategory) ||
              (currentView === "wine-scoring" && !selectedWine)) && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Something went wrong. Please refresh the page.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
