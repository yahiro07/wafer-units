import { Component, For } from "solid-js";
import { uiActions } from "@/actions";
import { setupDrivers } from "@/drivers";
import { SynthParameters } from "@/state";
import { appState } from "@/store";
import { WaveMode } from "@/constants";

function LinearSlider(props: {
  paramKey: keyof SynthParameters;
  label: string;
}) {
  const isWaveMode = props.paramKey === "waveMode";
  const min = 0;
  const max = isWaveMode ? WaveMode.NumWaveModes - 1 : 1;
  const step = isWaveMode ? 1 : 0.01;

  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        margin: "8px 0",
        gap: "16px",
      }}
    >
      <span
        style={{ width: "84px", "font-size": "14px", "font-weight": "bold" }}
      >
        {props.label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={appState.synthParams[props.paramKey]}
        onInput={(e) =>
          uiActions.setSynthParam(
            props.paramKey,
            parseFloat(e.currentTarget.value),
          )
        }
        style={{ flex: 1, cursor: "pointer" }}
        class="accent-violet-400"
      />
      <span
        style={{
          width: "24px",
          "text-align": "right",
          "font-size": "12px",
          color: "#888",
        }}
      >
        {isWaveMode
          ? `M${appState.synthParams[props.paramKey]}`
          : appState.synthParams[props.paramKey].toFixed(2)}
      </span>
    </div>
  );
}

const _TestKeyboardPart: Component = () => {
  const keyboardNotes = [
    { name: "C4", note: 60 },
    { name: "D4", note: 62 },
    { name: "E4", note: 64 },
    { name: "F4", note: 65 },
    { name: "G4", note: 67 },
    { name: "A4", note: 69 },
    { name: "B4", note: 71 },
  ];

  return (
    <div style={{ "text-align": "center" }}>
      <h3
        style={{
          margin: "0 0 12px 0",
          "font-size": "14px",
          color: "#888",
          "text-align": "left",
        }}
      >
        TEST KEYBOARD
      </h3>
      <div style={{ display: "flex", "justify-content": "center", gap: "6px" }}>
        <For each={keyboardNotes}>
          {(k) => (
            <button
              type="button"
              onMouseDown={() => uiActions.noteOn(k.note)}
              onMouseUp={() => uiActions.noteOff(k.note)}
              onMouseLeave={() => uiActions.noteOff(k.note)}
              style={{
                flex: 1,
                height: "60px",
                background: "#fff",
                color: "#000",
                "font-weight": "bold",
                border: "none",
                "border-radius": "4px",
                cursor: "pointer",
                "box-shadow": "0 4px 0 #ccc",
                transform: "translateY(0)",
                transition: "transform 0.05s",
              }}
            >
              {k.name}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export const SynthPanel: Component = () => {
  const styles = {
    panelBox: {
      color: "#fff",
      "box-shadow": "0 8px 24px rgba(0,0,0,0.5)",
    },
    topHeader: {
      margin: "0 0 20px 0",
      "text-align": "center",
      color: "#ff007f",
      "letter-spacing": "2px",
    },
    sectionBox: {
      background: "#262626",
      padding: "16px",
    },
    sectionHeader: {
      margin: "0 0 6px 0",
      "font-size": "14px",
      color: "#00a5ff",
      "font-weight": "bold",
    },
  } as const;

  return (
    <div style={styles.panelBox} class="w-[660px] h-[380px] flex-c bg-mist-700">
      <div class="flex-h gap-4">
        <div class="flex-v gap-4">
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionHeader}>OSCILLATOR</h3>
            <LinearSlider paramKey="waveMode" label="Wave Mode" />
            <LinearSlider paramKey="shape" label="Shape/Mod" />
            <LinearSlider paramKey="envMod" label="Env Mod" />
            <LinearSlider paramKey="detune" label="Detune" />
            <LinearSlider paramKey="sub" label="Sub OSC" />
          </div>
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionHeader}>AMP ENVELOPE</h3>
            <LinearSlider paramKey="decay" label="Decay" />
            <LinearSlider paramKey="release" label="Release" />
          </div>
        </div>
        <div class="flex-v gap-4">
          <div class="flex-v gap-4">
            <div style={styles.sectionBox}>
              <h3 style={styles.sectionHeader}>EFFECTS</h3>
              <LinearSlider paramKey="chorus" label="Chorus" />
              <LinearSlider paramKey="delay" label="Delay" />
              <LinearSlider paramKey="reverb" label="Reverb" />
            </div>
          </div>
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionHeader}>CONTROL</h3>
            <LinearSlider paramKey="master" label="Master Vol" />
            <LinearSlider paramKey="drift" label="Drift" />
            <LinearSlider paramKey="loFi" label="Lo-Fi" />
          </div>
          <div class="w-full flex-ha mt-[-4px] text-xs font-bold justify-between">
            <div>proto-engine-pd-fm</div>
            <div>active notes: {appState.numActiveNotes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function App() {
  setupDrivers();
  return <SynthPanel />;
}
