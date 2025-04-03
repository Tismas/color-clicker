import { observer } from "mobx-react";
import { ColorStore } from "../state/ColorStore";

interface Props {
  colorStore: ColorStore;
}

export const ProgressBar = observer(({ colorStore }: Props) => {
  const foregroundColor = colorStore.color.toString();
  const backgroundColor = colorStore.color.darken(20).toString();

  return (
    <div
      className="w-full rounded-full relative h-4"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className="rounded-l-full h-full absolute"
        style={{
          width: `${colorStore.percentage}%`,
          backgroundColor: foregroundColor,
        }}
      ></div>
    </div>
  );
});
