import type { WineCategory } from "../types/wine";

interface CategoryCardProps {
  category: WineCategory;
  onClick: () => void;
}

// Wine glass SVG icon - used for all categories
const WineGlassIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 15v6" />
    <path d="M8 21h8" />
    <path d="M12 15a4 4 0 0 0 4-4V3H8v8a4 4 0 0 0 4 4z" />
  </svg>
);

const categoryStyles = {
  "Red Wine": {
    backgroundColor: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)", // Deep red wine color
    textColor: "#ffffff",
    displayName: "Red",
  },
  "White Wine": {
    backgroundColor: "linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)", // Light golden white wine color
    textColor: "#1f2937",
    displayName: "White",
  },
  "Rosé Wine": {
    backgroundColor: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)", // Pink rosé color
    textColor: "#1f2937",
    displayName: "Rosé",
  },
  "Sparkling Wine": {
    backgroundColor: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)", // Light champagne color
    textColor: "#1f2937",
    displayName: "Sparkling",
  },
  "Dessert Wine": {
    backgroundColor: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)", // Golden dessert wine color
    textColor: "#1f2937",
    displayName: "Dessert",
  },
  "Fortified Wine": {
    backgroundColor: "linear-gradient(135deg, #92400e 0%, #78350f 100%)", // Dark amber/brown fortified wine color
    textColor: "#ffffff",
    displayName: "Fortified",
  },
};

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const style =
    categoryStyles[category.name as keyof typeof categoryStyles] ||
    categoryStyles["Red Wine"];

  const progressPercentage =
    category.totalCount > 0
      ? (category.completedCount / category.totalCount) * 100
      : 0;

  return (
    <div
      className="rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-h-[200px] flex flex-col justify-between"
      style={{
        background: style.backgroundColor,
        color: style.textColor,
      }}
      onClick={onClick}
    >
      {/* Category Name and Icon */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-light mb-4">{style.displayName}</h2>

          {/* Progress Bar */}
          <div className="w-24 h-1 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-current transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Wine Icon */}
        <div className="opacity-80">
          <WineGlassIcon />
        </div>
      </div>

      {/* Wine Count */}
      <div className="text-sm opacity-75 mt-4">
        {category.totalCount} {category.totalCount === 1 ? "wine" : "wines"}
      </div>
    </div>
  );
}
