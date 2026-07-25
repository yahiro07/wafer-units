import { useState } from "preact/hooks";
import { cz, qu } from "@/common/css-realm";
import { Icons } from "@/common/icons";
import { store } from "@/root/store";
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

const KeyboardKey = ({ xi, cellW }: { xi: number; cellW: number }) => {
  const subIndex = xi % 12;
  const [pressed, setPressed] = useState(false);
  const handlePointerDown = (e: PointerEvent) => {
    setPressed(true);
    store.setPreviewNotePitch(xi);
    startDragSession(e, {
      onUpOrCancel() {
        setPressed(false);
        store.setPreviewNotePitch(null);
      },
    });
  };
  const isBlack = keyTypes[subIndex] === "black";
  const blackW = cellW * 0.7;
  const activeColor = "#f80";

  return (
    <div
      class={cz(
        qu
          .wh(isBlack ? 0 : cellW, 70)
          .pointerEvents("none")
          .fontSize(12)
          .relative().it,
      )}
    >
      {!isBlack && (
        <div
          class={cz(
            qu.w(cellW).bd("#bbb").h("100%").it,
            qu.pointerEvents("auto").cursor("pointer").it,
            qu.flexVA().fJustify("end").fAlign("center").pb(1).it,
            pressed && qu.bg(activeColor).it,
          )}
          onPointerDown={handlePointerDown}
        >
          {xi === 0 && "rec"}
          {xi === 2 && <Icons.Redo size={8} class={qu.mb(0.5).it} />}
        </div>
      )}
      {isBlack && (
        <div
          class={cz(
            qu.absolute().w(blackW).h("60%").css({ zIndex: 1 }).it,
            qu.bg("linear-gradient(to bottom, #444, #777)").it,
            qu.pointerEvents("auto").cursor("pointer").it,
            qu.flexVA().fJustify("end").fAlign("center").pb(1).color("#fff").it,
            pressed && qu.bg(activeColor).it,
          )}
          style={{ transform: `translateX(-50%)` }}
          onPointerDown={handlePointerDown}
        >
          {xi === 1 && <Icons.Undo size={8} class={qu.mb(0.5).it} />}
        </div>
      )}
    </div>
  );
};

export const KeyboardView = () => {
  const { keyboardNumKeys } = store.useSnapshot();
  const numKeysWhite = (keyboardNumKeys / 12) * 7;
  const cellW = 600 / numKeysWhite;
  return (
    <div class={qu.flexH().it}>
      {seqNumbers(keyboardNumKeys).map((i) => (
        <KeyboardKey key={i} xi={i} cellW={cellW} />
      ))}
    </div>
  );
};
