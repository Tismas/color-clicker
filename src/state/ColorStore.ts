import { makeAutoObservable } from "mobx";
import tinycolor from "tinycolor2";

import { UpgradeStore } from "./UpgradeStore";

export type Color = "red" | "blue";

interface Options {
  unlockedFromStart?: boolean;
  initialTimeRequired: number;
}

export class ColorStore {
  amount: number = 0;
  totalAmount: number = 0;
  isUnlocked: boolean;
  running: boolean = false;
  manual: boolean = true;
  color: Color;
  private progress: number = 0;
  private initialTimeRequired: number;
  private baseGain: number = 1;

  speedUpgrade = new UpgradeStore("Upgrade speed", { red: 1 });
  valueUpgrade = new UpgradeStore("Upgrade value", { red: 50, blue: 5 });

  constructor(
    color: Color,
    { initialTimeRequired, unlockedFromStart }: Options
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.initialTimeRequired = initialTimeRequired || 5000;
    this.isUnlocked = unlockedFromStart || false;
    this.color = color;
  }

  tick(deltaTime: number) {
    if (!this.running) return;

    const timeRequired = this.getTimeRequired();

    this.progress += deltaTime;
    if (this.progress > timeRequired) {
      const gain = this.baseGain * (1 + this.valueUpgrade.bought);

      this.progress = 0;
      this.amount += gain;
      this.totalAmount += gain;

      if (this.manual) {
        this.running = false;
      }
    }
  }

  start() {
    this.running = true;
  }

  getColorInstance() {
    return tinycolor(this.color);
  }

  getPercentage() {
    const timeRequired = this.getTimeRequired();
    return (this.progress / timeRequired) * 100;
  }

  getVisibleUpgrades() {
    return [this.speedUpgrade, this.valueUpgrade].filter((upgrade) =>
      upgrade.isVisible()
    );
  }

  getTimeRequired() {
    return this.initialTimeRequired * Math.pow(0.75, this.speedUpgrade.bought);
  }

  unlock() {
    this.isUnlocked = true;
  }

  setAutomatic() {
    this.manual = false;
    this.start();
  }
}
