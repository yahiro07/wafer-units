import { cz, qu } from "@/common/css-realm";

export const LedIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cz(
        qu.wh(10, 10).rounded("100%").bd("#444").it,
        qu.bg(active ? "#0f0" : "#666").it,
      )}
    />
  );
};
