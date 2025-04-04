import tinycolor from "tinycolor2";
import { observer } from "mobx-react";

import { ProgressBar } from "./components/ProgressBar";
import { rootStore } from "../state/RootStore";

export const FeatureProgress = observer(() => {
  const step = rootStore.progress.getStep();

  return (
    <div className="absolute bottom-4 left-0 w-full px-4">
      <ProgressBar colorInstance={tinycolor("#0f0")} percentage={step.progress}>
        {step.label}
      </ProgressBar>
    </div>
  );
});
