import { makeAutoObservable } from "mobx";

import { rootStore } from "./RootStore";
import { CostType } from "../game/components/Cost";
import { Color } from "./ColorStore";

export interface UpgradeSaveData {
  bought: number;
  isUnlocked: boolean;
}

export class UpgradeStore {
  label: string;
  initialCost: CostType;

  bought: number = 0;
  isUnlocked: boolean = false;

  constructor(label: string, initialCost: CostType) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.label = label;
    this.initialCost = initialCost;
  }

  buy() {
    if (!this.canBuy()) return;
    const cost = this.getCost();

    Object.entries(cost).forEach(([color, cost]) => {
      const colorStore = rootStore.getColorStore(color as Color);
      colorStore.amount -= cost;
    });

    this.bought++;
  }

  canBuy() {
    const cost = this.getCost();

    return Object.entries(cost).every(([color, cost]) => {
      const colorStore = rootStore.getColorStore(color as Color);
      return colorStore.amount >= cost;
    });
  }

  isVisible() {
    if (this.isUnlocked) return true;

    const shouldUnlock = Object.entries(this.initialCost).every(
      ([color, cost]) => {
        const colorStore = rootStore.getColorStore(color as Color);
        return colorStore.totalAmount >= cost;
      }
    );

    if (shouldUnlock) {
      this.unlock();
    }

    return this.isUnlocked;
  }

  unlock() {
    this.isUnlocked = true;
  }

  getCost() {
    const cost: CostType = {};

    Object.entries(this.initialCost).forEach(([color, initialCost]) => {
      const colorCost = initialCost * Math.pow(1.5, this.bought);
      cost[color as Color] = Math.ceil(colorCost);
    });

    return cost;
  }

  getSaveData(): UpgradeSaveData {
    return {
      bought: this.bought,
      isUnlocked: this.isUnlocked,
    };
  }

  loadSaveData(saveData: UpgradeSaveData) {
    this.bought = saveData.bought;
    this.isUnlocked = saveData.isUnlocked;
  }
}
