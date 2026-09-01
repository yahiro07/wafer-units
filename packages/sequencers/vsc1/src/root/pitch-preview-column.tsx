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

const maskSubIndicesMajor = [1, 3, 6, 8, 10];
const maskSubIndicesMinor = [1, 4, 6, 9, 11];

const PitchesList = () => {
  const { keySpec, editScaleMode, octaveShift } = store.useSnapshot();
  const maskSubIndices =
    editScaleMode === "diatonic"
      ? keySpec.mode === "major"
        ? maskSubIndicesMajor
        : maskSubIndicesMinor
      : undefined;
  return (
    <div class={styles.list}>
      {seqNumbers(37).map((_i) => {
        const i = 36 - _i;
        const isTonic =
          editScaleMode === "diatonic"
            ? i % 12 === (keySpec.root + 12) % 12
            : i % 12 === 0;
        const isMasked = maskSubIndices?.includes((i - keySpec.root + 24) % 12);
        return (
          <div
            key={i}
            class={cz(isTonic && "tonic", isMasked && "masked")}
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
