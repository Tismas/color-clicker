import { makeAutoObservable } from "mobx";
import tinycolor from "tinycolor2";

export class ColorStore {
  amount: number = 0;
  private progress: number = 0;
  private timeRequired: number;
  private baseGain: number = 1;
  private _color: string;
  
  constructor(color: string, initialTimeRequired: number = 5000) {
    makeAutoObservable(this, {color: false}, { autoBind: true });

    this.timeRequired = initialTimeRequired;
    this._color = color;
  }

  tick(deltaTime: number) {
    this.progress += deltaTime;
    if (this.progress > this.timeRequired) {
      this.progress = 0;
      this.amount += this.baseGain;
    }
  }

  get color() {
    return tinycolor(this._color);
  }

  get percentage() {
    return (this.progress / this.timeRequired) * 100;
  }
}