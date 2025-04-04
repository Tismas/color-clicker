import { observer } from "mobx-react";

import { ClickOverlay } from "./ClickOverlay";
import { ProgressBar } from "../components/ProgressBar";
import { UpgradeButton } from "./UpgradeButton";

import { ColorStore } from "../../state/ColorStore";

interface Props {
  colorStore: ColorStore;
}

export const ResourceBar = observer(({ colorStore }: Props) => {
  const percentage = colorStore.getPercentage();
  const running = colorStore.running;

  const label = running ? <span>{percentage.toFixed(0)}%</span> : null;
  const isContinues = !colorStore.manual && colorStore.getTimeRequired() < 100;

  return (
    <>
      <div className="w-full relative h-12 flex items-center">
        <ClickOverlay colorStore={colorStore} />
        <ProgressBar
          colorInstance={colorStore.getColorInstance()}
          percentage={isContinues ? 100 : percentage}
        >
          {isContinues
            ? `${Math.round(colorStore.getResourcePerSecond())}/s`
            : label}
        </ProgressBar>
      </div>
      <div className="flex gap-2">
        {colorStore.getVisibleUpgrades().map((upgrade) => (
          <UpgradeButton key={upgrade.label} upgrade={upgrade} />
        ))}
      </div>
    </>
  );
});
