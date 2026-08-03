import { onCleanup } from "solid-js";
import { SynthPanelSection } from "@/sections/synth-panel-section";
import { uiActions } from "@/store/ui-actions";

export function App() {
  const cleanupFn = uiActions.initialize();

  onCleanup(() => {
    cleanupFn?.();
    uiActions.allNotesOff();
  });

  return (
    <div class="flex-c">
      <div class="h-auto w-[min(96vw,640px)] border border-slate-600">
        <SynthPanelSection />
      </div>
    </div>
  );
}
