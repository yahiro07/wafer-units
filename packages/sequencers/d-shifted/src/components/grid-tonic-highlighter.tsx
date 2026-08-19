import { css, cz } from "@/common/css-realm";
import { seqNumbers } from "@/utils/helpers";

export const GridTonicHighlighter = ({
  className,
  ny,
}: {
  className?: string;
  ny: number;
}) => {
  return (
    <div class={cz(baseStyle, className)}>
      {seqNumbers(ny).map((_, i) => {
        const isTonic = i % 7 === 0;
        const isDominant = i % 7 === 4;
        return (
          <div
            key={i}
            class={cz(isTonic && "--tonic", isDominant && "--dominant")}
          />
        );
      })}
    </div>
  );
};
const baseStyle = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column-reverse",
  "& > div": {
    flexGrow: 1,
    "&.--tonic": {
      background: "#0082",
    },
    "&.--dominant": {
      background: "#0051",
    },
  },
});
