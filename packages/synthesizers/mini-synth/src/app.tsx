import { onCleanup, onMount } from "solid-js";
import { unitInterface } from "@/audio/audio-engine";
import { MainSection } from "@/sections/main-section";
import { TopSection } from "@/sections/top-section";
import { cleanupAudioEngine, uiActions } from "@/store/app-store";
import { persistence } from "@/store/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

export function App() {
  onMount(() => {
    if (unitInterface) {
      unitInterface.completeSetup({
        unitAspects: {
          unitType: "instrument",
          categoryHint: "synthesizer",
          viewSize: [640, 320],
          preferJustSize: true,
        },
        noteInput: {
          noteOn(note, time) {
            uiActions.noteOn(note, time ?? 0, 1);
          },
          noteOff(note, time) {
            uiActions.noteOff(note, time ?? 0);
          },
        },
        persistence,
        cleanup: cleanupAudioEngine,
      });
    } else {
      const cleanup = setupMidiKeyboardInput({
        noteOn: (note) => uiActions.noteOn(note, 0, 1),
        noteOff: (note) => uiActions.noteOff(note, 0),
      });
      onCleanup(cleanup);
    }
  });

  return (
    <div
      class="flex-v bg-neutral-900 text-white overflow-hidden"
      style={{ width: "640px", height: "320px" }}
    >
      <TopSection />
      <MainSection />
    </div>
  );
}
