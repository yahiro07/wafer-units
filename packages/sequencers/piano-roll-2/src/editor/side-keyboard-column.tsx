import { useState } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { noteNameLabels, uiConfig } from "@/editor/ui-config";
import { startDragSession } from "@/utils/drag-session";
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
    width: "100%",
    background: "#fff",
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

const KeyboardKey = ({ yi }: { yi: number }) => {
  const { cellH } = uiConfig;
  const subIndex = yi % 12;
  const label = subIndex === 0 && noteNameLabels[yi];
  const [pressed, setPressed] = useState(false);

  const keyStyle = getKeyStyle(subIndex, cellH);

  const handlePointerDown = (e: PointerEvent) => {
    setPressed(true);
    startDragSession(e, {
      onUpOrCancel() {
        setPressed(false);
      },
    });
  };

  return (
    <div
      class={cz(qu.wh(80, cellH).css({ pointerEvents: "none" }).relative().it)}
    >
      <div
        class={cz(
          qu.absolute().it,
          qu.pointerEvents("auto").cursor("pointer").it,
          pressed && qu.bg("#4dd!important").it,
        )}
        style={keyStyle}
        onPointerDown={handlePointerDown}
      >
        {label && (
          <div
            class={cz(
              qu.flexHA().h("full").fJustify("end").p(1).it,
              qu.color("#666").fontSize(12).it,
              "font-monospace",
            )}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export const SideKeyboardColumn = () => {
  const { numKeys } = uiConfig;
  return (
    <div>
      {seqNumbers(numKeys).map((i) => (
        <KeyboardKey key={i} yi={numKeys - i - 1} />
      ))}
    </div>
  );
};
