import { observer } from "mobx-react";
import { ColorStore } from "../state/ColorStore";

interface Props {
  colorStore: ColorStore;
}

export const ProgressBar = observer(({ colorStore }: Props) => {
  const foregroundColor = colorStore.color.toString();
  const backgroundColor = colorStore.color.darken(20).toString();

  return (
    <div className="w-full relative h-12 flex items-center">
      {!colorStore.running && (
        <div
          className="absolute w-full h-full flex justify-center items-center cursor-pointer text-lg font-bold z-10 rounded-2xl bg-black/50 hover:bg-black/30"
          onClick={() => colorStore.start()}
        >
          Click me!
        </div>
      )}
      <div
        className="w-full rounded-full relative h-4 overflow-hidden"
        style={{ backgroundColor: backgroundColor }}
      >
        <div
          className="h-full absolute"
          style={{
            width: `${colorStore.percentage}%`,
            backgroundColor: foregroundColor,
          }}
        ></div>
      </div>
    </div>
  );
});
