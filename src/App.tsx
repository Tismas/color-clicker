import { useEffect } from "react";
import { observer } from "mobx-react";

import { rootStore } from "./state/RootStore";
import { Inventory } from "./game/Inventory";
import { ProgressBars } from "./game/ProgressBars";
import { FeatureProgress } from "./game/FeatureProgress";

const FPS = 60;

export const App = observer(() => {
  useEffect(() => {
    const interval = setInterval(rootStore.tick, 1000 / FPS);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Inventory />
      <ProgressBars />
      <FeatureProgress />
    </>
  );
});
