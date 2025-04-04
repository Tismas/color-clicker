import { observer } from "mobx-react";

import { Resource } from "./Resource";
import { Color } from "../../state/ColorStore";

export type CostType = Partial<Record<Color, number>>;

interface Props {
  cost: CostType;
}

export const Cost = observer(({ cost }: Props) => {
  return (
    <div className="flex space-x-2">
      {Object.entries(cost).map(
        ([color, amount]) =>
          amount > 0 && (
            <Resource key={color} color={color as Color} amount={amount} />
          )
      )}
    </div>
  );
});
