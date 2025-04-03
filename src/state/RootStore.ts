import { makeAutoObservable } from "mobx";
import { ColorStore } from "./ColorStore";

class RootStore {
  lastUpdate: Date = new Date();

  redColor = new ColorStore("#f00");

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  tick() {
    const now = new Date();
    const deltaTime = now.getTime() - this.lastUpdate.getTime();

    this.redColor.tick(deltaTime);

    this.lastUpdate = now;
  }
}

export const rootStore = new RootStore();