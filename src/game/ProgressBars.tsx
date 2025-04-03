import { observer } from "mobx-react";
import { ProgressBar } from "./ProgressBar";
import { rootStore } from "../state/RootStore";

export const ProgressBars = observer(() => {
  return (
    <div className="flex flex-col gap-4 px-16 py-8">
      {rootStore.unlockedColors.map((colorStore) => (
        <ProgressBar
          key={colorStore.color.toString()}
          colorStore={colorStore}
        />
      ))}
    </div>
  );
});
