import { Component, For, onCleanup } from "solid-js";
import { setupMidiKeyboardInput } from "@/utils/midi-keyboard-input";
import { mountAppRoot } from "@/utils/mount-app-root";
import { hostInterface, synthEngine } from "./engine";
import { SynthParameters } from "./state";

// ------------------------------------------------------------------------
// 1. アプリケーション用のStateとActionsの定義
// ------------------------------------------------------------------------

const appState = synthEngine.state;

void synthEngine.init();

const actions = {
  // パラメーター更新：UIストアを書き換え、同時にWorkletへ送信
  setSynthParameters(key: keyof SynthParameters, value: number) {
    synthEngine.uiActions.setParameter(key, value);
  },

  // 発音要求
  async noteOn(noteNumber: number) {
    await synthEngine.resumeOnUserAction();
    synthEngine.uiActions.noteOn(noteNumber);
  },

  // 消音要求
  noteOff(noteNumber: number) {
    synthEngine.uiActions.noteOff(noteNumber);
  },
};

// ------------------------------------------------------------------------
// 2. LinearSlider コンポーネントの実装
// ------------------------------------------------------------------------
function LinearSlider(props: {
  paramKey: keyof SynthParameters;
  label: string;
}) {
  // セキュリティとスライダーの滑らかさのための範囲設定
  const isWaveMode = props.paramKey === "waveMode";
  const min = "0";
  const max = isWaveMode ? "3" : "1";
  const step = isWaveMode ? "1" : "0.01";

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
        // appStateからリアルタイムに現在の値をバインド
        value={appState[props.paramKey]}
        // スライダーを動かした時にactions経由でストアとWorkletを同時更新
        onInput={(e) =>
          actions.setSynthParameters(
            props.paramKey,
            parseFloat(e.currentTarget.value),
          )
        }
        style={{ flex: 1, cursor: "pointer" }}
        class="accent-violet-400"
      />
      {/* デバッグや微調整がしやすいよう、現在の数値を右端に表示（WaveMode以外） */}
      <span
        style={{
          width: "24px",
          "text-align": "right",
          "font-size": "12px",
          color: "#888",
        }}
      >
        {isWaveMode
          ? `M${appState[props.paramKey]}`
          : appState[props.paramKey].toFixed(2)}
      </span>
    </div>
  );
}

const _TestKeyboardPart: Component = () => {
  // 簡易キーボード用のノート定義（C4〜B4）
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
              onMouseDown={() => actions.noteOn(k.note)}
              onMouseUp={() => actions.noteOff(k.note)}
              onMouseLeave={() => actions.noteOff(k.note)} // マウスがボタン外に外れた時のケア
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
              // アクティブ時に少し沈む演出
              // activeClass="synth-key-active"
            >
              {k.name}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------------
// 3. メイン UI コンポーネント (SynthPanel)
// ------------------------------------------------------------------------
export const SynthPanel: Component = () => {
  const styles = {
    panelBox: {
      // padding: "24px",
      // "max-width": "500px",
      // margin: "0 auto",
      // background: "#1a1a1a",
      color: "#fff",
      // "border-radius": "12px",
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
      // "border-radius": "8px",
      // "margin-bottom": "24px",
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
        {/* --- パラメーター・スライダー群 --- */}
        <div class="flex-v gap-4">
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionHeader}>OSCILLATOR</h3>
            {/* モードは 0:PD, 1:FM, 2:FM_FB, 3:PD_RESO */}
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

function App() {
  if (hostInterface) {
    hostInterface.setupUnitAgent({
      type: "instrument",
      categoryHint: "synthesizer",
      noteInput: {
        noteOn: actions.noteOn,
        noteOff: actions.noteOff,
      },
    });
  } else {
    const closeMidiIn = setupMidiKeyboardInput({
      noteOn(noteNumber) {
        actions.noteOn(noteNumber);
      },
      noteOff(noteNumber) {
        actions.noteOff(noteNumber);
      },
    });
    onCleanup(closeMidiIn);
  }
  return (
    <div class="w-dvw h-dvh flex-c gap-4 bg-gray-700">
      <SynthPanel />
    </div>
  );
}

mountAppRoot(() => <App />);
