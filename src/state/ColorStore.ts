import { makeAutoObservable } from "mobx";
import tinycolor from "tinycolor2";

import { UpgradeSaveData, UpgradeStore } from "./UpgradeStore";

export type Color = "red" | "blue" | "yellow";
export type ColorUpgrade =
  | "speedUpgrade"
  | "baseValueUpgrade"
  | "multiplayerValueUpgrade";

export interface ColorSaveData {
  amount: number;
  totalAmount: number;
  manual: boolean;
  isUnlocked: boolean;

  upgrades: Record<ColorUpgrade, UpgradeSaveData>;
}

interface Options {
  unlockedFromStart?: boolean;
  initialTimeRequired: number;
}

export class ColorStore {
  color: Color;

  amount: number = 0;
  totalAmount: number = 0;
  manual: boolean = true;
  isUnlocked: boolean;

  running: boolean = false;
  private progress: number = 0;
  private initialTimeRequired: number;

  upgrades: Record<ColorUpgrade, UpgradeStore> = {
    speedUpgrade: new UpgradeStore("25% speed boost", { red: 1 }),
    baseValueUpgrade: new UpgradeStore("Base value +1", { red: 25, blue: 1 }),
    multiplayerValueUpgrade: new UpgradeStore("Value multiplier +1", {
      red: 100,
      blue: 25,
      yellow: 1,
    }),
  };

  constructor(
    color: Color,
    { initialTimeRequired, unlockedFromStart }: Options
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.initialTimeRequired = initialTimeRequired || 5000;
    this.isUnlocked = unlockedFromStart || false;
    this.color = color;
  }

  getCompletionGain() {
    return (
      (this.upgrades.baseValueUpgrade.bought + 1) *
      (this.upgrades.multiplayerValueUpgrade.bought + 1)
    );
  }

  tick(deltaTime: number) {
    if (!this.running) return;

    const timeRequired = this.getTimeRequired();

    this.progress += deltaTime;
    if (this.progress > timeRequired) {
      const completionGain = this.getCompletionGain();
      const gain =
        timeRequired < deltaTime
          ? completionGain * (deltaTime / timeRequired)
          : completionGain;

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
    return Object.values(this.upgrades).filter((upgrade) =>
      upgrade.isVisible()
    );
  }

  getTimeRequired() {
    return (
      this.initialTimeRequired *
      Math.pow(0.75, this.upgrades.speedUpgrade.bought)
    );
  }

  unlock() {
    this.isUnlocked = true;
  }

  setAutomatic() {
    this.manual = false;
    this.start();
  }

  getResourcePerSecond() {
    return this.getCompletionGain() / (this.getTimeRequired() / 1000);
  }

  getSaveData(): ColorSaveData {
    return {
      amount: this.amount,
      totalAmount: this.totalAmount,
      manual: this.manual,
      isUnlocked: this.isUnlocked,
      upgrades: Object.entries(this.upgrades).reduce(
        (acc, [upgradeName, store]) => {
          acc[upgradeName as ColorUpgrade] = store.getSaveData();
          return acc;
        },
        {} as Record<ColorUpgrade, UpgradeSaveData>
      ),
    };
  }

  loadSaveData(saveData: ColorSaveData) {
    this.amount = saveData.amount;
    this.totalAmount = saveData.totalAmount;
    this.manual = saveData.manual;
    this.isUnlocked = saveData.isUnlocked;

    Object.entries(saveData.upgrades).forEach(([upgradeName, upgradeData]) => {
      const upgradeStore = this.upgrades[upgradeName as ColorUpgrade];
      upgradeStore.loadSaveData(upgradeData);
    });

    if (!this.manual) {
      this.start();
    }
  }
}
