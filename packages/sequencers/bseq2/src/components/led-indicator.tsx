import { qu } from "@/common/css-realm";

export const LedIndicator = ({ active }: { active: boolean }) => {
  return (
    <div sx={[qu.wh(8, 8).rounded("full"), qu.bg(active ? "#0f0" : "#666")]} />
  );
};
