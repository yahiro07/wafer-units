import { ComponentChildren } from "preact";
import { cz, qu } from "@/ui/common/css-realm";
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
    <div class={qu.relative().it}>
      {children}
      <div
        className={cz(
          qu.absolute().left(0).w("full").flexC().fontSize(14).it,
          qu.color("#fff").css({ whiteSpace: "nowrap" }).it,
        )}
        style={{ top: npx(yOffset - 20) }}
      >
        {label}
      </div>
    </div>
  );
};
