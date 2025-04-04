import { observer } from "mobx-react";

import { ClickOverlay } from "./ClickOverlay";
import { ProgressBar } from "../components/ProgressBar";
import { UpgradeButton } from "./UpgradeButton";

import { ColorStore } from "../../state/ColorStore";

interface Props {
  colorStore: ColorStore;
}

export const ResourceBar = observer(({ colorStore }: Props) => {
  return (
    <>
      <div className="w-full relative h-12 flex items-center">
        <ClickOverlay colorStore={colorStore} />
        <ProgressBar
          colorInstance={colorStore.getColorInstance()}
          percentage={colorStore.getPercentage()}
        />
      </div>
      <div className="flex gap-2">
        {colorStore.getVisibleUpgrades().map((upgrade) => (
          <UpgradeButton key={upgrade.label} upgrade={upgrade} />
        ))}
      </div>
    </>
  );
});
