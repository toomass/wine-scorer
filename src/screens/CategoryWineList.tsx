
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WineList } from "../components/WineList";
import type { WineCategory, Wine, ScoringCriterion } from "../types/wine";
import { getCategoryStyle } from "../styles/wineProperties";
import categoriesImg from "../assets/categories.png";

interface CategoryWineListProps {
  category: WineCategory;
  wines: Wine[];
  criteria: ScoringCriterion[];
  onWineSelect: (wineId: string) => void;
  onBack: () => void;
}

export function CategoryWineList({
  category,
  wines,
  criteria,
  onWineSelect,
  onBack,
}: CategoryWineListProps) {
  const progressPercentage =
    category.totalCount > 0
      ? (category.completedCount / category.totalCount) * 100
      : 0;

  const categoryStyle = getCategoryStyle(category.name);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: `url(${categoriesImg}) center center / cover no-repeat`,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: `linear-gradient(135deg, ${categoryStyle.tintColor} 0%, ${categoryStyle.tintColor} 100%)`,
        }}
      />
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "16px",
          }}
        >
          {/* Navigation */}
          <div style={{ alignSelf: "flex-start", marginBottom: "16px" }}>
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(0,0,0,0.1)",
                color: "#333",
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Categories</span>
            </Button>
          </div>

          {/* Category Header Card */}
          <div
            style={{
              background: categoryStyle.backgroundColor,
              color: categoryStyle.textColor,
              padding: "24px",
              borderRadius: "16px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h1 className="text-3xl font-light mb-4">
              {categoryStyle.displayName}
            </h1>
            <p className="opacity-90 text-lg mb-4">
              {category.totalCount} {category.totalCount === 1 ? "wine" : "wines"} • {criteria.length} scoring criteria
            </p>

            <div className="max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-sm opacity-90">
                <span>Category Progress</span>
                <span>
                  {category.completedCount}/{category.totalCount} completed
                </span>
              </div>
              <div className="w-full bg-white/40 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-white transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Wine List */}
          <div style={{ width: "100%" }}>
            <WineList wines={wines} criteria={criteria} onWineSelect={onWineSelect} />
          </div>

          {/* Category Complete Message */}
          {category.completedCount === category.totalCount &&
            category.totalCount > 0 && (
              <div 
                className="text-center p-6 rounded-lg border max-w-md mx-auto"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderColor: "rgba(0,0,0,0.1)",
                }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  ✅ Category Complete!
                </h3>
                <p>
                  You have finished evaluating all wines in the {categoryStyle.displayName} category.
                </p>
              </div>
            )}
        </div>
      </div>
    </>
  );
}
