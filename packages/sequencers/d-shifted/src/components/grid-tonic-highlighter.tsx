import { cz } from "@/common/css-realm";
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
            class={cz(isTonic && "tonic", isDominant && "dominant")}
          />
        );
      })}
    </div>
  );
};
const baseStyle = cz(
  "w-full h-full flex-v flex-col-reverse",
  "[&>div]:(flex-1 min-h-0)",
  "[&>div.tonic]:(bg-#0082)",
  "[&>div.dominant]:(bg-#0051)",
);
