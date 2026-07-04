import { cz, qu } from "@/utils/qulex-goober";

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
