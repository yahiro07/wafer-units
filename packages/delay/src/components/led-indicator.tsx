import { cx, qu } from "@/utils/qstyle-goober";

export const LedIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cx(
        qu.wh(10, 10).rounded("100%").bd("#444"),
        qu.bg(active ? "#0f0" : "#666"),
      )}
    />
  );
};
