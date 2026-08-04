import { qu } from "@/base/css-realm";

export const StepIndicatorLed = ({ active }: { active: boolean }) => {
  return (
    <div
      sx={[
        qu.wh(8, 8).css({ borderRadius: "50%" }),
        qu.bg(active ? "#0f0" : "#666"),
      ]}
    />
  );
};
