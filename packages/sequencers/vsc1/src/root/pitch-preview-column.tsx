import { cz } from "@/common/css-realm";
import { actions } from "@/root/actions";
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
  let lastIndex = index;
  startDragSession(e0, {
    onDown() {
      actions.setPreviewNoteNumber(48 + index);
    },
    onMove({ position }) {
      const next = pitchFromPoint(position.x, position.y);
      if (next && next !== lastIndex) {
        actions.setPreviewNoteNumber(48 + next);
        lastIndex = next;
      }
    },
    onUpOrCancel() {
      actions.setPreviewNoteNumber(-1);
    },
  });
};

export const PitchPreviewColumn = () => {
  return (
    <div class="flex-v mt-1">
      <div class="w-[70px] text-sm pl-3">Pitches</div>
      <div class="flex-v flex-col-reverse">
        {seqNumbers(25).map((i) => {
          const active = false;
          return (
            <div
              key={i}
              class={cz(
                "flex-1 bd-clGridBg flex-c h-[32px] cursor-pointer",
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
