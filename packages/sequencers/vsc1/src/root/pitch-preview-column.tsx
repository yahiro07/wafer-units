import { cz } from "@/common/css-realm";
import { actions } from "@/root/actions";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { seqNumbers } from "@/utils/helpers";

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

export const PitchPreviewColumn = () => {
  return (
    <div class="h-390px overflow-y-scroll">
      <div class="flex-v flex-col-reverse">
        {seqNumbers(37).map((i) => {
          const active = i % 12 === 0;
          return (
            <div
              key={i}
              class={cz(
                "flex-1 bd-clGridBg flex-c w-70px h-32px cursor-pointer",
                active && "bg-clHighlight",
              )}
              data-pitch-index={i}
              onPointerDown={(e) => handlePitchCellPointerDown(e, i)}
            >
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
};
