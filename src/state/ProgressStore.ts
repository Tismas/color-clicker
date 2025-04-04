import { makeAutoObservable } from "mobx";
import { progression, ProgressionStepData } from "./data/progression";
import { rootStore } from "./RootStore";

interface ProgressionStep extends ProgressionStepData {
  progress: number;
}

export class ProgressStore {
  private step = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getStep(): ProgressionStep {
    const currentStep = progression[this.step];
    if (currentStep === undefined) {
      return {
        colorRequirement: {},
        label: "Congratulations! You've completed the game.",
        progress: 1,
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
        const colorStore = rootStore.getColorStore(color as string);
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
        const colorStore = rootStore.getColorStore(color as string);
        return acc + Math.min(colorStore.totalAmount, amount);
      },
      0
    );

    return Math.round((totalCollected / totalRequired) * 100);
  }
}
