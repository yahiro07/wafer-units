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
      style={{
        width: npx(width),
        height: npx(height),
        border: "solid 0.5px #222",
      }}
    >
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        const x = xi * cellW;
        const y = yi * cellH;
        const subNoteIndex = (ny - yi - 1) % 12;
        let bgColor = colors.pianoRollBg;
        let borderColor = colors.gridWeak2;
        const isBlackKey = [1, 3, 6, 8, 10].includes(subNoteIndex);
        if (isBlackKey) {
          bgColor = colors.pianoRollBgBlackKey;
        }
        if (xi % 4 === 3) {
          borderColor = colors.gridStrong;
        }
        if (xi === 15) {
          borderColor = colors.gridStrong2;
        }
        const hasBottomBorder = subNoteIndex === 0 || subNoteIndex === 5;
        return (
          <div
            key={`${xi}-${yi}`}
            style={{
              position: "absolute",
              left: npx(x),
              top: npx(y),
              width: npx(cellW),
              height: npx(cellH),
              borderRight: `solid 0.5px ${borderColor}`,
              borderBottom: hasBottomBorder
                ? `solid 0.5px ${colors.gridStrong}`
                : "none",
              backgroundColor: bgColor,
            }}
          />
        );
      })}
    </div>
  );
};
