import { observer } from "mobx-react";
import { rootStore } from "../state/RootStore";

export const Inventory = observer(() => {
  return (
    <div className="flex gap-4 px-16 pt-8">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 p-2"
          style={{ background: rootStore.redColor.color.toString() }}
        ></div>
        <div className="text-sm">{rootStore.redColor.amount}</div>
      </div>
    </div>
  );
});
