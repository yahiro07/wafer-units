import { programPresets } from "@/audio/presets";
import { MainColumnSection } from "@/sections/main-column-section";
import { TopColumnSection } from "@/sections/top-column-section";
import { appState } from "@/store/app-store";
import { uiActions } from "@/store/ui-actions";

const programNames = programPresets.map((preset) => preset.name);

export function SynthPanelSection() {
  return (
    <main class="flex-v h-full w-full gap-2 border border-slate-600 bg-slate-900 p-2 text-slate-100">
      <TopColumnSection
        selectedProgramIndex={appState.selectedProgramIndex}
        programNames={programNames}
        midiConnected={appState.midiConnected}
        onSelectProgram={uiActions.applyPresetByIndex}
        onShiftProgram={uiActions.shiftProgram}
      />

      <MainColumnSection
        parameters={appState.parameters}
        onSetParameter={uiActions.setParameter}
      />
    </main>
  );
}
