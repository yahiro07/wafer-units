import { css } from "@/common/css-realm";
import { colors } from "@/editor/theme";
import { uiConfig } from "@/editor/ui-config";
import { npx } from "@/utils/helpers";

export const GridBackground = ({
  nx,
  ny,
  width,
  height,
}: {
  nx: number;
  ny: number;
  width: number;
  height: number;
}) => {
  const { cellW, cellH } = uiConfig;

  return (
    <div
      class={styles.base}
      style={{
        width: npx(width),
        height: npx(height),
      }}
    >
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        const x = xi * cellW;
        const y = yi * cellH;
        const subNoteIndex = (ny - yi - 1) % 12;
        const isBlackKey = [1, 3, 6, 8, 10].includes(subNoteIndex);

        let borderStrength = "default";
        if (xi % 4 === 3) {
          borderStrength = "stronger1";
        }
        if (xi === 15) {
          borderStrength = "stronger2";
        }
        const hasBottomBorder = subNoteIndex === 0 || subNoteIndex === 5;
        return (
          <div
            key={`${xi}-${yi}`}
            sx={[
              hasBottomBorder && "--has-bottom-border",
              isBlackKey && "--is-black-key",
              `--border-${borderStrength}`,
            ]}
            style={{
              left: npx(x),
              top: npx(y),
            }}
          />
        );
      })}
    </div>
  );
};
const styles = {
  base: css({
    border: "solid 0.5px #222",
    ">div": {
      position: "absolute",
      width: npx(uiConfig.cellW),
      height: npx(uiConfig.cellH),
      background: colors.pianoRollBg,

      "&.--is-black-key": {
        background: colors.pianoRollBgBlackKey,
      },

      "&.--has-bottom-border": {
        borderBottom: `solid 0.5px ${colors.gridStrong}`,
      },

      borderRight: `solid 0.5px ${colors.gridWeak2}`,
      "&.--border-stronger1": {
        borderRightColor: colors.gridStrong,
      },
      "&.--border-stronger2": {
        borderRightColor: colors.gridStrong2,
      },
    },
  }),
};
