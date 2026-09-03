import { uiColors } from "@/common/ui-theme";
import { npx } from "@/utils/helpers";

export const GridBackground = ({
  nx,
  ny,
  width,
  height,
  bgAlterStrideX,
}: {
  nx: number;
  ny: number;
  width: number;
  height: number;
  bgAlterStrideX?: number;
}) => {
  const cellW = width / nx;
  const cellH = height / ny;

  const bgAlterStride = bgAlterStrideX ?? 0;

  return (
    <div
      style={{
        position: "absolute",
        left: npx(0),
        top: npx(0),
        width: npx(width),
        height: npx(height),
      }}
    >
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        const x = xi * cellW;
        const y = yi * cellH;
        const bgAlter = xi % (bgAlterStride * 2) < bgAlterStride;
        const borderRightColor =
          xi % 4 === 3 ? uiColors.clPageBg : uiColors.clGridLineV;
        return (
          <div
            key={`${xi}-${yi}`}
            style={{
              position: "absolute",
              left: npx(x),
              top: npx(y - 1),
              width: npx(cellW),
              height: npx(cellH - 1),
              borderRight: `solid 1px ${borderRightColor}`,
              backgroundColor: bgAlter
                ? uiColors.clGridBgAlt
                : uiColors.clGridBg,
            }}
          />
        );
      })}
    </div>
  );
};
