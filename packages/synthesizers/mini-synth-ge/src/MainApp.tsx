import { onCleanup, onMount } from "solid-js";
import { getAudioEngine, unitInterface } from "@/audio";
import { Header } from "@/sections/Header";
import { LeftColumn } from "@/sections/LeftColumn";
import { RightColumn } from "@/sections/RightColumn";
import { persistence } from "@/store/persistence";
import { appState, SynthParameters } from "@/store/store";
import { uiActions } from "@/store/ui-actions";
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
        inputs: ["note", "automation"],
      },
      noteInput: {
        async noteOn(note, time) {
          engine.noteOn(note, 1, time);
        },
        noteOff(note, time) {
          engine.noteOff(note, time);
        },
      },
      automationInput: {
        getParameterSpecs() {
          return [
            { id: "oscWave", step: 2 },
            { id: "oscDetune" },
            { id: "oscSub" },
            { id: "oscDrift" },
            { id: "fxChorus" },
            { id: "fxReverb" },
            { id: "filterCutoff" },
            { id: "filterPeak" },
            { id: "filterEnvMod" },
            { id: "ampDecay" },
            { id: "ampRelease" },
            { id: "masterVolume" },
          ];
        },
        getParameter(id) {
          if (id === "oscWave") {
            return appState.parameters.oscWave / 2;
          } else {
            return appState.parameters[id as keyof SynthParameters];
          }
        },
        setParameter(id, value) {
          if (id === "oscWave") {
            uiActions.setParameter("oscWave", value * 2);
          } else {
            uiActions.setParameter(id as keyof SynthParameters, value);
          }
        },
      },
      persistence,
      cleanup: engine.cleanup,
    });
  } else {
    const closeMidiIn = setupMidiKeyboardInput({
      async noteOn(note) {
        await engine.resumeIfNeed();
        engine.noteOn(note, 1, 0);
      },
      noteOff(note) {
        engine.noteOff(note, 0);
      },
    });
    onCleanup(closeMidiIn);
  }

  onMount(() => {
    if (!unitInterface) {
      // Simple click to start audio
      const onClick = async () => {
        await engine.resumeIfNeed();
        console.log("resumed");
      };
      containerRef.addEventListener("mousedown", onClick, {
        capture: true,
        once: true,
      });
    }
  });

  return (
    <div class="flex-c">
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
