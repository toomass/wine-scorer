import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { BreadcrumbNav } from "../components/BreadcrumbNav";

interface TastingSessionProps {
  config: TastingConfig & { categories: WineCategory[] };
}

export function TastingSession({ config }: TastingSessionProps) {
  const { categoryId, wineId } = useParams<{ categoryId?: string; wineId?: string }>();
  const navigate = useNavigate();
  
  const [wines, setWines] = useState<Wine[]>(config.wines);
  const [categories, setCategories] = useState<WineCategory[]>(
    config.categories
  );
  const [currentView, setCurrentView] =
    useState<NavigationView>("category-selection");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedWineId, setSelectedWineId] = useState<string | null>(
    null
  );

  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId)
    : null;

  const selectedWine = selectedWineId
    ? wines.find((w) => w.id === selectedWineId)
    : null;

  const categoryWines = selectedCategory
    ? wines.filter((wine) => wine.category === selectedCategory.name)
    : [];

  // Sync URL parameters with component state
  useEffect(() => {
    if (categoryId && wineId) {
      // We're on a wine scoring page
      const category = categories.find(c => c.id === categoryId);
      const wine = wines.find(w => w.id === wineId);
      
      if (category && wine) {
        setSelectedCategoryId(categoryId);
        setSelectedWineId(wineId);
        setCurrentView("wine-scoring");
      } else {
        navigate("/categories", { replace: true });
      }
    } else if (categoryId) {
      // We're on a category wine list page
      const category = categories.find(c => c.id === categoryId);
      
      if (category) {
        setSelectedCategoryId(categoryId);
        setSelectedWineId(null);
        setCurrentView("category-wine-list");
      } else {
        navigate("/categories", { replace: true });
      }
    } else {
      // We're on the categories page
      setSelectedCategoryId(null);
      setSelectedWineId(null);
      setCurrentView("category-selection");
    }
  }, [categoryId, wineId, categories, wines, navigate]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  }, [navigate]);

  const handleWineSelect = useCallback((wineId: string) => {
    if (selectedCategoryId) {
      navigate(`/categories/${selectedCategoryId}/wines/${wineId}`);
    }
  }, [navigate, selectedCategoryId]);

  const handleBackToCategories = useCallback(() => {
    navigate("/categories");
  }, [navigate]);

  const handleBackToCategoryWines = useCallback(() => {
    if (selectedCategoryId) {
      navigate(`/categories/${selectedCategoryId}`);
    }
  }, [navigate, selectedCategoryId]);

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

  const handleCommentUpdate = useCallback(
    (criterionId: string, comment: string) => {
      if (!selectedWineId) return;

      setWines((prevWines) => {
        const updatedWines = prevWines.map((wine) => {
          if (wine.id === selectedWineId) {
            return {
              ...wine,
              comments: {
                ...wine.comments,
                [criterionId]: comment,
              },
            };
          }
          return wine;
        });

        return updatedWines;
      });
    },
    [selectedWineId]
  );

  return (
    <>
      <BreadcrumbNav />
      {/* Category Selection - Full Screen */}
      {currentView === "category-selection" && (
        <CategorySelection
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      )}

      {/* Category Wine List */}
      {currentView === "category-wine-list" && selectedCategory && (
        <CategoryWineList
          category={selectedCategory}
          wines={categoryWines}
          criteria={config.criteria}
          onWineSelect={handleWineSelect}
          onBack={handleBackToCategories}
        />
      )}

      {/* Wine Scoring */}
                  {currentView === "wine-scoring" && selectedWine && (
              <WineScoring
                wine={selectedWine}
                criteria={config.criteria}
                onScoreUpdate={handleScoreUpdate}
                onCommentUpdate={handleCommentUpdate}
                onBack={handleBackToCategoryWines}
              />
            )}

      {/* Fallback for invalid states */}
      {((currentView === "category-wine-list" && !selectedCategory) ||
        (currentView === "wine-scoring" && !selectedWine)) && (
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
          <div className="text-center py-12">
            <p className="text-gray-500">
              Something went wrong. Please refresh the page.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
