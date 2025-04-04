import { observer } from "mobx-react";

import { ResourceBar } from "./ResourceBar/ResourceBar";
import { rootStore } from "../state/RootStore";

export const ProgressBars = observer(() => {
  return (
    <div className="flex flex-col gap-4 px-16 py-8">
      {rootStore.getUnlockedColors().map((colorStore) => (
        <ResourceBar
          key={colorStore.color.toString()}
          colorStore={colorStore}
        />
      ))}
    </div>
  );
});
