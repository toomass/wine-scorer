import { CategoryCard } from "../components/CategoryCard";
import type { WineCategory } from "../types/wine";
import categoriesImg from "../assets/categories.png";

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
            gap: "15px",
            minHeight: "120%",
          }}
        >
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => onCategorySelect(category.id)}
              />
            ))}
            {completedWines === totalWines && totalWines > 0 && (
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 max-w-md mx-auto shadow-lg">
                <h3 className="text-2xl font-light text-gray-900 mb-4">🎉 Session Complete</h3>
                <p className="text-gray-700">All {totalWines} wines have been evaluated</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
