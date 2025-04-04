import { ReactNode } from "react";
import { Color } from "../ColorStore";
import { Resource } from "../../game/components/Resource";
import { rootStore } from "../RootStore";

export interface ProgressionStepData {
  colorRequirement: Partial<Record<Color, number>>;
  label: ReactNode;
  onUnlock: () => void;
}

export const progression: ProgressionStepData[] = [
  {
    label: (
      <>
        Collect <Resource className="ml-1 mr-1" color="red" amount={50} /> to
        unlock <Resource className="ml-1" color="blue" />
      </>
    ),
    colorRequirement: {
      red: 50,
    },
    onUnlock: () => {
      rootStore.getColorStore("blue").unlock();
    },
  },
  {
    label: (
      <>
        Automate <Resource color="red" /> by collecting 100{" "}
        <Resource color="blue" />
      </>
    ),
    colorRequirement: {
      blue: 100,
    },
    onUnlock: () => {
      rootStore.getColorStore("red").setAutomatic();
    },
  },
];
