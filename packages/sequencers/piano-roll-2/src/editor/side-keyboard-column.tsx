import { cz, qu } from "@/common/css-realm";
import { noteNameLabels, uiConfig } from "@/editor/ui-config";
import { seqNumbers } from "@/utils/helpers";

const keyTypes = [
  "whiteL",
  "black",
  "whiteM",
  "black",
  "whiteH",
  "whiteL",
  "black",
  "whiteM",
  "black",
  "whiteM",
  "black",
  "whiteH",
];

function getKeyStyle(subIndex: number, cellH: number) {
  const keyType = keyTypes[subIndex];
  const keyStyle: Record<string, any> = {
    height: cellH,
    left: 0,
  };
  if (keyType === "whiteL") {
    keyStyle.height += cellH / 2;
    keyStyle.bottom = 0;
  } else if (keyType === "whiteM") {
    keyStyle.height += cellH;
    keyStyle.top = 0;
    keyStyle.bottom = 0;
    keyStyle.margin = "auto 0";
  } else if (keyType === "whiteH") {
    keyStyle.height += cellH / 2;
    keyStyle.top = 0;
  } else if (keyType === "black") {
    keyStyle.zIndex = 1;
    keyStyle.width = "63%";
    keyStyle.background = "linear-gradient(to right, #222, #666)";
    keyStyle.top = 0;
    keyStyle.bottom = 0;
    keyStyle.margin = "auto 0";
  }
  const withBottomBorder = subIndex === 0 || subIndex === 5;
  if (withBottomBorder) {
    keyStyle.borderBottom = `solid 0.5px #0003`;
  }
  if (subIndex === 0) {
    keyStyle.background = "#e4e4e4";
  }
  return keyStyle;
}

export const SideKeyboardColumn = () => {
  const { numKeys, cellH } = uiConfig;
  return (
    <div>
      {seqNumbers(numKeys).map((i) => {
        const yi = numKeys - i - 1;
        const subIndex = yi % 12;
        const label = subIndex === 0 && noteNameLabels[i];
        const keyStyle = getKeyStyle(subIndex, cellH);
        return (
          <div class={cz(qu.wh(80, cellH).relative().it)}>
            <div
              class={cz(
                qu.absolute().bg("#fff").w("full").it,
                qu.flexHA().justify("end").p(1).it,
                qu.color("#666").fontSize(11).cursor("pointer").it,
              )}
              style={keyStyle}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
