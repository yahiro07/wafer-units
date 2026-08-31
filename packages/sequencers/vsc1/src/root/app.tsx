import { cz } from "@/common/css-realm";
import { useSetupDrivers } from "@/root/drivers";
import { PitchPreviewColumn } from "@/root/pitch-preview-column";
import { StepsEditorRoot } from "@/root/steps-editor";
import { seqNumbers } from "@/utils/helpers";

const StepsEditor2 = () => {
  return (
    <div class={styles.stepsRow}>
      {seqNumbers(16).map((i) => (
        <div key={i} class={styles.stepCell} data-step-index={i} />
      ))}
    </div>
  );
};
const styles = {
  stepsRow: cz("flex-h"),
  stepCell: cz("w-36px h-32px bd-#888 flex-c"),
};

const PageRoot = () => {
  return (
    <div class="flex-h gap-4">
      <PitchPreviewColumn />
      <StepsEditorRoot />
      {/* <StepsEditor2 /> */}
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
