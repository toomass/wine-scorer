export const categoryStyles = {
  "Red Wine": {
    backgroundColor: "linear-gradient(135deg, rgba(127, 29, 29, 0.85) 0%, rgba(153, 27, 27, 0.85) 100%)", // Deep red wine color
    textColor: "#ffffff",
    displayName: "Red",
    tintColor: "rgba(127, 29, 29, 0.5)", // Light tint for backgrounds
  },
  "White Wine": {
    backgroundColor: "linear-gradient(135deg, rgba(254, 252, 232, 0.85) 0%, rgba(254, 243, 199, 0.85) 100%)", // Light golden white wine color
    textColor: "#1f2937",
    displayName: "White",
    tintColor: "rgba(254, 252, 232, 0.5)", // Light tint for backgrounds
  },
  "Rosé Wine": {
    backgroundColor: "linear-gradient(135deg, rgba(252, 231, 243, 0.85) 0%, rgba(249, 168, 212, 0.85) 100%)", // Pink rosé color
    textColor: "#1f2937",
    displayName: "Rosé",
    tintColor: "rgba(252, 231, 243, 0.5)", // Light tint for backgrounds
  },
  "Sparkling Wine": {
    backgroundColor: "linear-gradient(135deg, rgba(241, 245, 249, 0.85) 0%, rgba(226, 232, 240, 0.85) 100%)", // Light champagne color
    textColor: "#1f2937",
    displayName: "Sparkling",
    tintColor: "rgba(241, 245, 249, 0.5)", // Light tint for backgrounds
  },
  "Dessert Wine": {
    backgroundColor: "linear-gradient(135deg, rgba(252, 211, 77, 0.85) 0%, rgba(245, 158, 11, 0.85) 100%)", // Golden dessert wine color
    textColor: "#1f2937",
    displayName: "Dessert",
    tintColor: "rgba(252, 211, 77, 0.5)", // Light tint for backgrounds
  },
  "Fortified Wine": {
    backgroundColor: "linear-gradient(135deg, rgba(146, 64, 14, 0.85) 0%, rgba(120, 53, 15, 0.85) 100%)", // Dark amber/brown fortified wine color
    textColor: "#ffffff",
    displayName: "Fortified",
    tintColor: "rgba(146, 64, 14, 0.5)", // Light tint for backgrounds
  },
};

export const getCategoryStyle = (categoryName: string) => {
  return categoryStyles[categoryName as keyof typeof categoryStyles] || categoryStyles["Red Wine"];
}; 