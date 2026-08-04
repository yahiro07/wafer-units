import { colors } from "@/ui/common/colors";
import { qu } from "@/ui/common/css-realm";
import { npx } from "@/utils/helpers";
import { qfc } from "@/utils/qfc";

export const PartIndicator = qfc<{
  active?: boolean;
  width: number;
  height: number;
}>()({
  render: ({ active, width, height }, styles) => {
    return (
      <div
        sx={[styles.base, active && styles.active]}
        style={{ width: npx(width), height: npx(height) }}
      />
    );
  },
  styles: {
    base: qu.bg("#4444").rounded(1),
    active: qu.bg(`${colors.active}!important`),
  },
});
