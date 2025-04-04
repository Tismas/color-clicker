import { makeAutoObservable } from "mobx";

import { progression, ProgressionStepData } from "./data/progression";
import { rootStore } from "./RootStore";
import { Color } from "./ColorStore";

export interface ProgressionSaveData {
  step: number;
}

interface ProgressionStep extends ProgressionStepData {
  progress: number;
}

export class ProgressStore {
  step = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getStep(): ProgressionStep {
    const currentStep = progression[this.step];
    if (currentStep === undefined) {
      return {
        colorRequirement: {},
        label: "Congratulations! You've completed the game.",
        progress: 100,
        onUnlock: () => {},
      };
    }

    return { ...currentStep, progress: this.getProgress(currentStep) };
  }

  tick() {
    const currentStep = progression[this.step];
    if (currentStep === undefined) return;

    const isCompleted = Object.entries(currentStep.colorRequirement).every(
      ([color, amount]) => {
        const colorStore = rootStore.getColorStore(color as Color);
        return colorStore.totalAmount >= amount;
      }
    );

    if (isCompleted) {
      currentStep.onUnlock();
      this.step++;
    }
  }

  getProgress(step: ProgressionStepData): number {
    const totalRequired = Object.values(step.colorRequirement).reduce(
      (acc, amount) => {
        return acc + amount;
      },
      0
    );

    const totalCollected = Object.entries(step.colorRequirement).reduce(
      (acc, [color, amount]) => {
        const colorStore = rootStore.getColorStore(color as Color);
        return acc + Math.min(colorStore.totalAmount, amount);
      },
      0
    );

    return (totalCollected / totalRequired) * 100;
  }

  getSaveData(): ProgressionSaveData {
    return {
      step: this.step,
    };
  }

  loadSaveData(saveData: ProgressionSaveData) {
    this.step = saveData.step;
  }
}
