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
        className="w-full rounded-full relative h-5 overflow-hidden flex items-center text-sm"
        style={{ backgroundColor: backgroundColor }}
      >
        <div
          className="h-full absolute"
          style={{
            width: `${percentage}%`,
            backgroundColor: foregroundColor,
          }}
        ></div>
        <div className="ml-auto mr-auto flex relative z-1 bg-black/40 px-4 rounded-2xl">
          {children}
        </div>
      </div>
    );
  }
);
