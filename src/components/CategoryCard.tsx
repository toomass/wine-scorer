import type { WineCategory } from "../types/wine";
import { sharedCardStyle } from "../styles/sharedCardStyle";
import { getCategoryStyle } from "../styles/wineProperties";

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

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const style = getCategoryStyle(category.name);
  
  return (
    <div
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 flex flex-col justify-between"
      style={{
        ...sharedCardStyle.cardStyle,
        background: style.backgroundColor,
        color: style.textColor,
        padding: '20px',
        minHeight: '140px',
      }}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-light mb-2" style={{ color: style.textColor }}>
            {style.displayName}
          </h2>
          <div className="w-24 h-1 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-current transition-all duration-500"
              style={{ 
                width: `${category.totalCount > 0 ? (category.completedCount / category.totalCount) * 100 : 0}%`,
                backgroundColor: style.textColor,
              }}
            />
          </div>
        </div>
        <div className="opacity-80" style={{ color: style.textColor, transform: 'scale(0.8)' }}>
          <WineGlassIcon />
        </div>
      </div>
      <div className="text-sm opacity-75 mt-2" style={{ color: style.textColor }}>
        {category.totalCount} {category.totalCount === 1 ? "wine" : "wines"}
      </div>
    </div>
  );
}
