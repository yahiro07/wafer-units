import "./styles";
import { onCleanup } from "solid-js";
import { SynthPanelSection } from "@/sections/synth-panel-section";
import { uiActions } from "@/store/app-store";
import { mountAppRoot } from "@/utils/mount-app-root";

const App = () => {
  const cleanupFn = uiActions.initialize();

  onCleanup(() => {
    cleanupFn?.();
    uiActions.allNotesOff();
  });

  return (
    <div class="flex-c min-h-screen w-full bg-[radial-gradient(circle_at_18%_12%,#232834_0%,#131722_44%,#090d14_100%)] px-2 py-4">
      <div
        class="h-auto w-[min(96vw,640px)] border border-slate-600"
        onPointerDown={uiActions.resumeAudio}
      >
        <SynthPanelSection />
      </div>
    </div>
  );
};

mountAppRoot(() => <App />);
