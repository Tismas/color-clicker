import { observer } from "mobx-react";

import { rootStore } from "../state/RootStore";
import { Resource } from "./components/Resource";

export const Inventory = observer(() => {
  return (
    <div className="flex gap-4 px-16 pt-8">
      {rootStore.getUnlockedColors().map((colorStore) => (
        <Resource
          key={colorStore.color}
          color={colorStore.color}
          amount={colorStore.amount}
        />
      ))}
    </div>
  );
});
