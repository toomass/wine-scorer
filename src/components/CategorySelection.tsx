import { CategoryCard } from "./CategoryCard";
import type { WineCategory } from "../types/wine";

interface CategorySelectionProps {
  categories: WineCategory[];
  onCategorySelect: (categoryId: string) => void;
}

export function CategorySelection({
  categories,
  onCategorySelect,
}: CategorySelectionProps) {
  const totalWines = categories.reduce((sum, cat) => sum + cat.totalCount, 0);
  const completedWines = categories.reduce(
    (sum, cat) => sum + cat.completedCount,
    0
  );

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(135deg, #f5f1e8 0%, #ede4d3 100%),
          radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      {/* Wine glass pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 45v9h-6v6h12v-6h-6v-9a6 6 0 0 0 6-6V6H24v33a6 6 0 0 0 6 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-gray-900 mb-8 tracking-wide">
            Blind Wine
          </h1>
          <h1 className="text-6xl font-light text-gray-900 mb-12 tracking-wide -mt-4">
            Tasting
          </h1>
        </div>

        {/* Category Cards */}
        <div className="max-w-2xl mx-auto space-y-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onCategorySelect(category.id)}
            />
          ))}
        </div>

        {/* Session Complete Message */}
        {completedWines === totalWines && totalWines > 0 && (
          <div className="text-center mt-12 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 max-w-md mx-auto shadow-lg">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              🎉 Session Complete
            </h3>
            <p className="text-gray-700">
              All {totalWines} wines have been evaluated
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
