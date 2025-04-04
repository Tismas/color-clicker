import { observer } from "mobx-react";

import { UpgradeStore } from "../../state/UpgradeStore";
import { Cost } from "../components/Cost";

interface Props {
  upgrade: UpgradeStore;
}

export const UpgradeButton = observer(({ upgrade }: Props) => {
  return (
    <button
      className="bg-gray-800 py-2 px-4 flex gap-1 rounded-2xl text-xl cursor-pointer hover:bg-slate-700 transition-colors duration-200 disabled:bg-slate-950 disabled:cursor-not-allowed disabled:hover:bg-slate-950 select-none"
      onClick={upgrade.buy}
      disabled={!upgrade.canBuy()}
    >
      {upgrade.label} (<Cost cost={upgrade.getCost()} />)
    </button>
  );
});
