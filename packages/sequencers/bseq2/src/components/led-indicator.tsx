import { cx, qu } from "@/utils/qstyle-goober";

export const LedIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cx(qu.wh(8, 8).rounded("full"), qu.bg(active ? "#0f0" : "#666"))}
    />
  );
};
