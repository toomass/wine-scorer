import wineIcons from "../assets/asset_jPGmwEWf5hXKrB6H6265dRpd_background-removal_1752986857.png";

interface WineIconProps {
  criterionId: string;
  size?: number;
}

export function WineIcon({ criterionId, size = 100 }: WineIconProps) {
  // Get the correct icon position for the sprite (2x2 grid)
  const getIconPosition = (id: string) => {
    const iconSize = size; // Each icon in the sprite
    switch (id) {
      case "color":
        return "0 0"; // top-left
      case "aroma":
        return `-${iconSize}px 0`; // top-right
      case "taste":
        return `0 -${iconSize}px`; // bottom-left
      case "finish":
        return `-${iconSize}px -${iconSize}px`; // bottom-right
      default:
        return "0 0";
    }
  };

  return (
    <div
      className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${wineIcons})`,
        backgroundSize: `${size * 2}px ${size * 2}px`, // 2x2 grid
        backgroundPosition: getIconPosition(criterionId),
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
