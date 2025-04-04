import { makeAutoObservable } from "mobx";

export class StatsStore {
  totalTime: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addTotalTime(deltaTime: number) {
    this.totalTime += deltaTime;
  }
}
