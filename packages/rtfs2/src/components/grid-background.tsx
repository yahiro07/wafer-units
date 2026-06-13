import { npx } from "mofur/ax-ui";

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
        border: "solid 0.5px #d4d4d4",
      }}
    >
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        const x = xi * cellW;
        const y = yi * cellH;
        const bgAlter = xi % (bgAlterStride * 2) < bgAlterStride;
        return (
          <div
            key={`${xi}-${yi}`}
            style={{
              position: "absolute",
              left: npx(x),
              top: npx(y),
              width: npx(cellW),
              height: npx(cellH),
              border: "solid 0.5px #d4d4d4",
              backgroundColor: bgAlter ? "#fff" : "#f0f0f0",
            }}
          />
        );
      })}
    </div>
  );
};
