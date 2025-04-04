import { observer } from "mobx-react";
import { PropsWithChildren } from "react";
import { Instance } from "tinycolor2";

interface Props {
  colorInstance: Instance;
  percentage: number;
}

export const ProgressBar = observer(
  ({ colorInstance, percentage, children }: PropsWithChildren<Props>) => {
    const foregroundColor = colorInstance.clone().toString();
    const backgroundColor = colorInstance.clone().darken(20).toString();

    return (
      <div
        className="w-full rounded-full relative h-6 overflow-hidden flex items-center text-sm border-2 border-black"
        style={{ backgroundColor: backgroundColor }}
      >
        <div
          className="h-full absolute"
          style={{
            width: `${percentage}%`,
            backgroundColor: foregroundColor,
          }}
        ></div>
        <div className="ml-auto mr-auto flex gap-1 relative z-1 text-shadow-lg text-shadow-black select-none">
          {children}
        </div>
      </div>
    );
  }
);
