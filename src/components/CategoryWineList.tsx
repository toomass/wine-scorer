import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { WineList } from "./WineList";
import type { WineCategory, Wine, ScoringCriterion } from "../types/wine";

// Color mapping shared with other components
const categoryStyles = {
  "Red Wine": {
    backgroundColor: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
    textColor: "#ffffff",
  },
  "White Wine": {
    backgroundColor: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)",
    textColor: "#1f2937",
  },
  "Rosé Wine": {
    backgroundColor: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)",
    textColor: "#1f2937",
  },
  "Sparkling Wine": {
    backgroundColor: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
    textColor: "#1f2937",
  },
  "Dessert Wine": {
    backgroundColor: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
    textColor: "#1f2937",
  },
  "Fortified Wine": {
    backgroundColor: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
    textColor: "#ffffff",
  },
};

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

  const style =
    categoryStyles[category.name as keyof typeof categoryStyles] ||
    categoryStyles["Red Wine"];

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div>
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

      {/* Fancy Header */}
      <div
        className="rounded-3xl p-10 relative overflow-hidden shadow-2xl border border-white/20 text-center"
        style={{ background: style.backgroundColor, color: style.textColor }}
      >
        {/* Decorative Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 45v9h-6v6h12v-6h-6v-9a6 6 0 0 0 6-6V6H24v33a6 6 0 0 0 6 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-light tracking-wide drop-shadow-lg">
            {category.displayName}
          </h1>
          <p className="opacity-90 text-lg">
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
              You have finished evaluating all wines in the {category.displayName} category.
            </p>
          </div>
        )}
    </div>
  );
}
