import { useEffect } from "react";
import { observer } from "mobx-react";

import { rootStore } from "./state/RootStore";
import { Inventory } from "./game/Inventory";
import { ProgressBars } from "./game/ProgressBars";
import { FeatureProgress } from "./game/FeatureProgress";

const FPS = 60;
const SAVE_INTERVAL = 1000 * 60;

const onExit = () => {
  rootStore.save();
};

export const App = observer(() => {
  useEffect(() => {
    rootStore.load();

    const interval = setInterval(rootStore.tick, 1000 / FPS);
    const saveInterval = setInterval(() => {
      rootStore.save();
    }, SAVE_INTERVAL);

    window.addEventListener("beforeunload", onExit);

    return () => {
      clearInterval(interval);
      clearInterval(saveInterval);
      window.removeEventListener("beforeunload", onExit);
    };
  }, []);

  return (
    <>
      <Inventory />
      <ProgressBars />
      <FeatureProgress />
    </>
  );
});
