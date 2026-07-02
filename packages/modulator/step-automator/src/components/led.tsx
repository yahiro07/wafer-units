import { cx, qu } from "@/utils/qstyle-goober";

export const StepIndicatorLed = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cx(
        qu.wh(8, 8).css({ borderRadius: "50%" }),
        qu.bg(active ? "#0f0" : "#666"),
      )}
    />
  );
};
