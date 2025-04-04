import tinycolor from "tinycolor2";
import { twMerge } from "tailwind-merge";
import { observer } from "mobx-react";

import { Color } from "../../state/ColorStore";

interface Props {
  color: Color;
  className?: string;
  amount?: number;
}

export const Resource = observer(({ color, amount, className }: Props) => {
  const colorInstance = tinycolor(color);

  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      <div
        className="w-4 h-4"
        style={{ background: colorInstance.toString() }}
      ></div>
      {typeof amount === "number" ? (
        <div className="text-sm">{amount}</div>
      ) : null}
    </div>
  );
});
