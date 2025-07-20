import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen";
import { TastingSession } from "./screens/TastingSession";
import { createCategorizedTastingConfig } from "./data/sampleWines";
import { BreadcrumbNav } from "./components/BreadcrumbNav";

function App() {
  const tastingConfig = createCategorizedTastingConfig("Wine Blind Tasting Session");
  return (
    <BrowserRouter>
      <BreadcrumbNav />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/categories" element={<TastingSession config={tastingConfig} />} />
        <Route path="/categories/:categoryId" element={<TastingSession config={tastingConfig} />} />
        <Route path="/categories/:categoryId/wines/:wineId" element={<TastingSession config={tastingConfig} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
