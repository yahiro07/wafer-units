import "./page.css";
import "beams/ax-ui/utility-classes.css";

import { mountAppRoot } from "beams/ax-solid/mount-app-root";
import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { onCleanup, onMount } from "solid-js";
import { hostInterface } from "@/audio/audio-engine";
import { MainSection } from "@/sections/main-section";
import { TopSection } from "@/sections/top-section";
import { uiActions } from "@/store/app-store";

const App = () => {
  onMount(() => {
    if (hostInterface) {
      hostInterface.setupUnitAgent({
        type: "instrument",
        categoryHint: "synthesizer",
        noteInput: {
          noteOn: (note) => uiActions.noteOn(note, 1),
          noteOff: (note) => uiActions.noteOff(note),
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
