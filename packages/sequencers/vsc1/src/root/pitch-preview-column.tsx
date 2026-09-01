import { cz } from "@/common/css-realm";
import { mapPitchIndexToPitchName } from "@/defs/pitch-names";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { seqNumbers } from "@/utils/helpers";
import { useInitialScrollCenter } from "@/utils/use-initial-scroll-center";
import { useRef } from "preact/hooks";

const pitchFromPoint = (x: number, y: number) => {
  const el = document.elementFromPoint(x, y);
  const cell = el?.closest("[data-pitch-index]");
  if (cell instanceof HTMLElement) {
    const n = Number(cell.dataset.pitchIndex);
    return Number.isFinite(n) ? n : undefined;
  }
};

const handlePitchCellPointerDown = (e0: PointerEvent, index: number) => {
  startDragSession(e0, {
    onDown() {
      actions.previewTone(index);
    },
    onMove({ position }) {
      const next = pitchFromPoint(position.x, position.y);
      if (next && next !== store.state.latestPitchIndex) {
        actions.previewTone(next);
      }
    },
    onUpOrCancel() {
      actions.previewTone(-1);
    },
  });
};

const maskSubIndices = [1, 3, 6, 8, 10];

const PitchesList = () => {
  const { keyTranspose, pitchMode, keyMode, octaveShift } = store.useSnapshot();
  return (
    <div class={styles.list}>
      {seqNumbers(37).map((_i) => {
        const i = 36 - _i;
        const tonic =
          (i + (keyMode === "minor" ? 3 : 0)) % 12 === keyTranspose % 12;
        const masked =
          pitchMode === "diatonic" &&
          maskSubIndices.includes((i + keyTranspose + 12) % 12);
        return (
          <div
            key={i}
            class={cz(tonic && "tonic", masked && "masked")}
            data-pitch-index={i}
            onPointerDown={(e) => handlePitchCellPointerDown(e, i)}
          >
            {mapPitchIndexToPitchName(i + octaveShift * 12)}
          </div>
        );
      })}
    </div>
  );
};

export const PitchPreviewColumn = () => {
  const baseDivRef = useRef<HTMLDivElement>(null);
  useInitialScrollCenter(baseDivRef);
  return (
    <div
      ref={baseDivRef}
      class={styles.base}
      onWheel={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <PitchesList />
    </div>
  );
};
const styles = {
  base: cz("h-360px overflow-y-scroll"),
  list: cz(
    "flex-v flex-col",
    "[&>div]:(flex-1 bd-#333 bg-#555 flex-c w-70px h-32px cursor-pointer text-white)",
    "[&>div.tonic]:(bg-clHighlight)",
    "[&>div.masked]:(hidden)",
  ),
};
