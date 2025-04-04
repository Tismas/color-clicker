import { makeAutoObservable } from "mobx";

import { Color, ColorSaveData, ColorStore } from "./ColorStore";
import { StatsSaveData, StatsStore } from "./StatsStore";
import { ProgressionSaveData, ProgressStore } from "./ProgressStore";

interface SaveData {
  version: string;
  stats: StatsSaveData;
  progress: ProgressionSaveData;
  colors: Record<Color, ColorSaveData>;
}

class RootStore {
  lastUpdate: Date = new Date();

  stats = new StatsStore();
  progress = new ProgressStore();
  colors: Record<Color, ColorStore> = {
    red: new ColorStore("red", {
      initialTimeRequired: 5000,
      unlockedFromStart: true,
    }),
    blue: new ColorStore("blue", { initialTimeRequired: 30000 }),
    yellow: new ColorStore("yellow", { initialTimeRequired: 180000 }),
  };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  tick() {
    const now = new Date();
    const deltaTime = now.getTime() - this.lastUpdate.getTime();

    Object.values(this.colors).forEach((color) => color.tick(deltaTime));
    this.stats.addTotalTime(deltaTime);
    this.progress.tick();

    this.lastUpdate = now;
  }

  getUnlockedColors() {
    return Object.values(this.colors).filter((color) => color.isUnlocked);
  }

  getColorStore(color: Color) {
    return this.colors[color];
  }

  save() {
    const saveData: SaveData = {
      version: "1.0",
      stats: this.stats.getSaveData(),
      progress: this.progress.getSaveData(),
      colors: Object.entries(this.colors).reduce((acc, [color, store]) => {
        acc[color as Color] = store.getSaveData();
        return acc;
      }, {} as Record<Color, ColorSaveData>),
    };

    localStorage["save"] = JSON.stringify(saveData);
  }

  load() {
    const saveData = localStorage["save"];
    if (!saveData) return;

    const parsedData: SaveData = JSON.parse(saveData);

    this.stats.loadSaveData(parsedData.stats);
    this.progress.loadSaveData(parsedData.progress);

    Object.entries(parsedData.colors).forEach(([color, data]) => {
      const colorStore = this.getColorStore(color as Color);
      colorStore.loadSaveData(data);
    });
  }
}

export const rootStore = new RootStore();
