import { makeAutoObservable } from "mobx";
import tinycolor from "tinycolor2";

interface Options {
  unlockedFromStart?: boolean;
  initialTimeRequired: number;
}

export class ColorStore {
  amount: number = 0;
  isUnlocked: boolean;
  running: boolean = false;
  manual: boolean = true;
  private progress: number = 0;
  private timeRequired: number;
  private baseGain: number = 1;
  private _color: string;

  constructor(
    color: string,
    { initialTimeRequired, unlockedFromStart }: Options
  ) {
    makeAutoObservable(this, { color: false }, { autoBind: true });

    this.timeRequired = initialTimeRequired || 5000;
    this.isUnlocked = unlockedFromStart || false;
    this._color = color;
  }

  tick(deltaTime: number) {
    if (!this.running) return;

    this.progress += deltaTime;
    if (this.progress > this.timeRequired) {
      this.progress = 0;
      this.amount += this.baseGain;
      if (this.manual) {
        this.running = false;
      }
    }
  }

  start() {
    this.running = true;
  }

  get color() {
    return tinycolor(this._color);
  }

  get percentage() {
    return (this.progress / this.timeRequired) * 100;
  }
}
