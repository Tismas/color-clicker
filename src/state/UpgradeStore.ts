import { makeAutoObservable } from "mobx";

import { rootStore } from "./RootStore";
import { CostType } from "../game/components/Cost";

export class UpgradeStore {
  label: string;
  initialCost: CostType;
  bought: number = 0;
  unlocked: boolean = false;

  constructor(label: string, initialCost: CostType) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.label = label;
    this.initialCost = initialCost;
  }

  buy() {
    if (!this.canBuy()) return;
    const cost = this.getCost();

    rootStore.colors.forEach((colorStore) => {
      const color = colorStore.color;
      const colorCost = cost[color] || 0;
      colorStore.amount -= colorCost;
    });

    this.bought++;
  }

  canBuy() {
    const cost = this.getCost();

    return rootStore.colors.every((colorStore) => {
      const color = colorStore.color;
      const colorCost = cost[color] || 0;
      return colorStore.amount >= colorCost;
    });
  }

  isVisible() {
    if (this.unlocked) return true;

    const cost = this.getCost();

    const shouldUnlock = rootStore.colors.every((colorStore) => {
      const color = colorStore.color;
      const colorCost = cost[color] || 0;
      return colorStore.totalAmount >= colorCost;
    });

    this.unlocked = shouldUnlock;

    return this.unlocked;
  }

  getCost() {
    const cost: CostType = {};

    rootStore.colors.forEach((colorStore) => {
      const colorCost =
        (this.initialCost[colorStore.color] || 0) * Math.pow(1.5, this.bought);
      cost[colorStore.color] = Math.ceil(colorCost);
    });

    return cost;
  }
}
