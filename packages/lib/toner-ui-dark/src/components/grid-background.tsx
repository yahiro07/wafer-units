import { css } from "../common/css-realm";

const colors = {
  clGridBackground: "#222",
  clGridLine: "#2c2c2c",
};

export const GridBackground = ({
  className,
  nx,
  ny,
}: {
  className?: string;
  nx: number;
  ny: number;
}) => {
  return (
    <div
      className={css(
        {
          position: "relative",
          width: "100%",
          height: "100%",
          border: `solid 0.5px ${colors.clGridLine}`,
          "& > div": {
            position: "absolute",
            width: `${100 / nx}%`,
            height: `${100 / ny}%`,
            border: `solid 0.5px ${colors.clGridLine}`,
          },
        },
        className,
      )}
    >
      {Array.from({ length: nx * ny }).map((_, i) => {
        const xi = i % nx;
        const yi = Math.floor(i / nx);
        return (
          <div
            key={`${xi}-${yi}`}
            style={{
              left: `${(xi * 100) / nx}%`,
              top: `${(yi * 100) / ny}%`,
              background: colors.clGridBackground,
            }}
          />
        );
      })}
    </div>
  );
};
