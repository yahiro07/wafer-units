import { cz, qu } from "@/base/css-realm";

export const StepIndicatorLed = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cz(
        qu.wh(8, 8).css({ borderRadius: "50%" }).it,
        qu.bg(active ? "#0f0" : "#666").it,
      )}
    />
  );
};
