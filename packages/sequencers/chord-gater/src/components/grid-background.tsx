import { css, cz } from "@/common/css-realm";

export const GridBackground = ({
  className,
  nx,
  ny,
  bgAlterStrideX,
}: {
  className?: string;
  nx: number;
  ny: number;
  bgAlterStrideX?: number;
}) => {
  const bgAlterStride = bgAlterStrideX ?? 0;

  return (
    <div class={cz(baseStyle, className)}>
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        const bgAlter = xi % (bgAlterStride * 2) < bgAlterStride;
        return (
          <div
            key={`${xi}-${yi}`}
            style={{
              left: `${(xi * 100) / nx}%`,
              top: `${(yi * 100) / ny}%`,
              width: `${100 / nx}%`,
              height: `${100 / ny}%`,
              backgroundColor: bgAlter ? "#333" : "#444",
            }}
          />
        );
      })}
    </div>
  );
};
const baseStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  border: "solid 0.5px #222",
  "& > div": {
    position: "absolute",
    border: "solid 0.5px #222",
  },
});
