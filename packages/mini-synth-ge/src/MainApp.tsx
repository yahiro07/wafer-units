import { onCleanup, onMount } from "solid-js";
import { getAudioEngine, unitInterface } from "@/audio";
import { Header } from "@/sections/Header";
import { LeftColumn } from "@/sections/LeftColumn";
import { RightColumn } from "@/sections/RightColumn";
import { persistence } from "@/store/persistence";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";

export const MainApp = () => {
  let containerRef!: HTMLDivElement;

  // User interaction needed to start AudioContext, but we can setup listeners
  const engine = getAudioEngine();

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
          async noteOn(note) {
            await engine.resumeIfNeed();
            engine.noteOn(note, 1);
          },
          noteOff(note) {
            engine.noteOff(note);
          },
        },
        stateInput: persistence,
      },
    });
  } else {
    const closeMidiIn = setupMidiKeyboardInput({
      async noteOn(note) {
        await engine.resumeIfNeed();
        engine.noteOn(note, 1);
      },
      noteOff(note) {
        engine.noteOff(note);
      },
    });
    onCleanup(closeMidiIn);
  }

  onMount(() => {
    // Simple click to start audio
    const onClick = async () => {
      await engine.resumeIfNeed();
      console.log("resumed");
    };
    containerRef.addEventListener("mousedown", onClick, {
      capture: true,
      once: true,
    });
  });

  return (
    <div class="flex-c min-h-screen">
      <div
        ref={containerRef}
        class="bg-gray-100 border border-gray-400 shadow-xl overflow-hidden"
        style={{
          width: "500px",
          height: "270px",
          display: "flex",
          "flex-direction": "column",
        }}
      >
        <Header />
        <div class="flex-h flex-1 px-2">
          <LeftColumn />
          <RightColumn />
        </div>
      </div>
    </div>
  );
};
