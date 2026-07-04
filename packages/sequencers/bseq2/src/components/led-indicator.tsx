import { cz, qu } from "@/common/css-realm";

export const LedIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      class={cz(
        qu.wh(8, 8).rounded("full").it,
        qu.bg(active ? "#0f0" : "#666").it,
      )}
    />
  );
};
