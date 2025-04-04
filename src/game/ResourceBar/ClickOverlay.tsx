import { observer } from "mobx-react";

import { ColorStore } from "../../state/ColorStore";

interface Props {
  colorStore: ColorStore;
}

export const ClickOverlay = observer(({ colorStore }: Props) => {
  if (colorStore.running) return null;

  return (
    <div
      className="absolute w-full h-full flex justify-center items-center cursor-pointer text-lg font-bold z-10 rounded-2xl bg-black/50 hover:bg-black/30 transition-colors duration-200 select-none"
      onClick={() => colorStore.start()}
    >
      Click me!
    </div>
  );
});
