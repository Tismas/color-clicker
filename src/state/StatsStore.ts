import { makeAutoObservable } from "mobx";

export interface StatsSaveData {
  totalTime: number;
}

export class StatsStore {
  totalTime: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addTotalTime(deltaTime: number) {
    this.totalTime += deltaTime;
  }

  getSaveData(): StatsSaveData {
    return {
      totalTime: this.totalTime,
    };
  }

  loadSaveData(saveData: StatsSaveData) {
    this.totalTime = saveData.totalTime;
  }
}
