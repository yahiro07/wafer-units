import { ComponentChildren } from "preact";
import { qu } from "@/ui/common/css-realm";
import { npx } from "@/utils/helpers";

export const UpperLabel = ({
  label,
  children,
  yOffset = 0,
}: {
  label: string;
  children: ComponentChildren;
  yOffset?: number;
}) => {
  return (
    <div sx={qu.relative()}>
      {children}
      <div
        sx={[
          qu.absolute().left(0).w("full").flexC().fontSize(14),
          qu.color("#fff"),
          { whiteSpace: "nowrap" },
        ]}
        style={{ top: npx(yOffset - 20) }}
      >
        {label}
      </div>
    </div>
  );
};
