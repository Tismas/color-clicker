import { makeAutoObservable } from "mobx";

import { ColorStore } from "./ColorStore";
import { StatsStore } from "./StatsStore";
import { ProgressStore } from "./ProgressStore";

class RootStore {
  lastUpdate: Date = new Date();

  stats = new StatsStore();
  progress = new ProgressStore();
  colors = [
    new ColorStore("red", {
      initialTimeRequired: 5000,
      unlockedFromStart: true,
    }),
    new ColorStore("blue", { initialTimeRequired: 30000 }),
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  tick() {
    const now = new Date();
    const deltaTime = now.getTime() - this.lastUpdate.getTime();

    this.colors.forEach((color) => color.tick(deltaTime));
    this.stats.addTotalTime(deltaTime);
    this.progress.tick();

    this.lastUpdate = now;
  }

  getUnlockedColors() {
    return this.colors.filter((color) => color.isUnlocked);
  }

  getColorStore(color: string) {
    const colorStore = this.colors.find((c) => c.color === color);
    if (!colorStore) {
      throw new Error(`Color ${color} not found`);
    }
    return colorStore;
  }
}

export const rootStore = new RootStore();
