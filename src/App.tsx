import { TastingSession } from "./components/TastingSession";
import { createCategorizedTastingConfig } from "./data/sampleWines";

function App() {
  const tastingConfig = createCategorizedTastingConfig(
    "Wine Blind Tasting Session"
  );

  return <TastingSession config={tastingConfig} />;
}

export default App;
