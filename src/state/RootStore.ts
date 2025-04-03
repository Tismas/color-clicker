import { makeAutoObservable } from "mobx";
import { ColorStore } from "./ColorStore";

class RootStore {
  lastUpdate: Date = new Date();

  colors = [
    new ColorStore("#f00", {
      initialTimeRequired: 5000,
      unlockedFromStart: true,
    }),
    new ColorStore("#00f", { initialTimeRequired: 30000 }),
  ];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  tick() {
    const now = new Date();
    const deltaTime = now.getTime() - this.lastUpdate.getTime();

    this.colors.forEach((color) => color.tick(deltaTime));

    this.lastUpdate = now;
  }

  get unlockedColors() {
    return this.colors.filter((color) => color.isUnlocked);
  }
}

export const rootStore = new RootStore();
