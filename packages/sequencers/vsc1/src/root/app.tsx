import { cz } from "@/common/css-realm";
import { actions } from "@/root/actions";
import { useSetupDrivers } from "@/root/drivers";
import { store } from "@/root/store";
import { startDragSession } from "@/utils/drag-session";
import { seqNumbers } from "@/utils/helpers";

const PitchPreviewColumn = () => {
  const { pitchIndices } = store.useSnapshot();

  const handlePointerDown = (e0: PointerEvent, index: number) => {
    startDragSession(e0, {
      onDown() {
        actions.setPreviewNoteNumber(48 + index);
      },
      onUpOrCancel(e) {
        actions.setPreviewNoteNumber(-1);
      },
    });
  };
  return (
    <div class="flex-v mt-1">
      <div class="w-[70px] text-sm pl-3">Pitches</div>
      <div class="flex-v flex-col-reverse">
        {seqNumbers(25).map((i) => {
          const active = pitchIndices.includes(i);
          return (
            <div
              key={i}
              class={cz(
                "flex-1 bd-clGridBg flex-c h-[32px] cursor-pointer",
                active && "bg-clHighlight",
              )}
              onPointerDown={(e) => handlePointerDown(e, i)}
            >
              {i}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PageRoot = () => {
  return (
    <div class="flex-h">
      <PitchPreviewColumn />
      <div class="flex-v gap-3 bg-clPageBg text-clPageText p-8">
        <button onClick={() => actions.setPreviewNoteNumber(60)}>
          Play 60
        </button>
        <button onClick={() => actions.setPreviewNoteNumber(64)}>
          Play 64
        </button>
        <button onClick={() => actions.setPreviewNoteNumber(-1)}>Stop</button>
      </div>
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
