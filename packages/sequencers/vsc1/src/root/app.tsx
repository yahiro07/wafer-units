import { useSetupDrivers } from "@/root/drivers";
import { PitchPreviewColumn } from "@/root/pitch-preview-column";
import { StepsEditorRoot } from "@/root/steps-editor";

const PageRoot = () => {
  return (
    <div class="flex-h">
      <PitchPreviewColumn />
      <StepsEditorRoot />
    </div>
  );
};
export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
