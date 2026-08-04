import { qu } from "@/common/css-realm";

export const LedIndicator = ({ active }: { active: boolean }) => {
  return (
    <div
      sx={[
        qu.wh(10, 10).rounded("100%").bd("#444"),
        qu.bg(active ? "#0f0" : "#666"),
      ]}
    />
  );
};
