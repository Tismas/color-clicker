import { useEffect } from "react";

import { rootStore } from "./state/RootStore";
import { observer } from "mobx-react";
import { Inventory } from "./game/Inventory";
import { ProgressBars } from "./game/ProgressBars";

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
    </>
  );
});
