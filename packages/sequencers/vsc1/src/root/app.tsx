import { actions } from "@/root/actions";
import { useSetupDrivers } from "@/root/drivers";
import { PitchPreviewColumn } from "@/root/pitch-preview-column";

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
