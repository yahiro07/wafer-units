import "./styles/page.css";
import "./styles/utility-classes.css";

import { onCleanup, onMount } from "solid-js";
import { unitInterface } from "@/audio/audio-engine";
import { MainSection } from "@/sections/main-section";
import { TopSection } from "@/sections/top-section";
import { uiActions } from "@/store/app-store";
import { persistence } from "@/store/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { mountAppRoot } from "@/utils/mount-app-root";

const App = () => {
  onMount(() => {
    if (unitInterface) {
      unitInterface.completeSetup({
        unitAspects: {
          unitType: "instrument",
          categoryHint: "synthesizer",
          outputs: ["audio"],
          inputs: ["note", "state"],
        },
        primaryInputPortHandlers: {
          noteInput: {
            noteOn: (note) => uiActions.noteOn(note, 1),
            noteOff: (note) => uiActions.noteOff(note),
          },
          stateInput: persistence,
        },
      });
    } else {
      const cleanup = setupMidiKeyboardInput({
        noteOn: (note) => uiActions.noteOn(note, 1),
        noteOff: (note) => uiActions.noteOff(note),
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
};

mountAppRoot(() => <App />);
