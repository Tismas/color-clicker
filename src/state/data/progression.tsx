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
        Collect <Resource color="red" amount={25} /> to unlock{" "}
        <Resource color="blue" />
      </>
    ),
    colorRequirement: {
      red: 25,
    },
    onUnlock: () => {
      rootStore.getColorStore("blue").unlock();
    },
  },
  {
    label: (
      <>
        Collect <Resource color="blue" amount={50} /> to unlock{" "}
        <Resource color="yellow" />
      </>
    ),
    colorRequirement: {
      blue: 50,
    },
    onUnlock: () => {
      rootStore.getColorStore("yellow").unlock();
    },
  },
  {
    label: (
      <>
        Collect 100 <Resource color="yellow" /> to automate red resource
      </>
    ),
    colorRequirement: {
      yellow: 100,
    },
    onUnlock: () => {
      rootStore.getColorStore("red").setAutomatic();
    },
  },
];
