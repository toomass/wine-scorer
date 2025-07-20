import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import { TastingSession } from "./components/TastingSession";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
