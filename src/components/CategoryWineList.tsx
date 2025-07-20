import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { WineList } from "./WineList";
import type { WineCategory, Wine, ScoringCriterion } from "../types/wine";

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

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Categories</span>
          </Button>
        </div>
      </div>

      {/* Category Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {category.displayName}
        </h1>
        <p className="text-gray-600">
          {category.totalCount} {category.totalCount === 1 ? "wine" : "wines"} •
          {criteria.length} scoring criteria
        </p>

        {/* Category Progress */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Category Progress</span>
            <span>
              {category.completedCount}/{category.totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Wine List */}
      <WineList wines={wines} criteria={criteria} onWineSelect={onWineSelect} />

      {/* Category Complete Message */}
      {category.completedCount === category.totalCount &&
        category.totalCount > 0 && (
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ✅ Category Complete!
            </h3>
            <p className="text-green-700">
              You have finished evaluating all wines in the{" "}
              {category.displayName} category.
            </p>
          </div>
        )}
    </div>
  );
}
