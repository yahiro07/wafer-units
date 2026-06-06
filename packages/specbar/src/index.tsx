import "./page.css";
import "mofur/ax-ui/utility-classes.css";
import { mountAppRoot } from "mofur/ax-react";
import { mapKnobGainDb } from "mofur/mo-audio";
import { ScalerBoxAutoSized } from "mofur/mo-react";
import { createStore } from "snap-store";
import { getUnitInterface } from "wus-unit-types";
import { Knob } from "@/components/knob";
import { setupDummyHost } from "@/dummy-host";
import { BasicSpectrumView } from "@/organisms/basic-spectrum-view";
import { SegmentedSpectrumView } from "@/organisms/segmented-spectrum-view";

const configs = {
  debug: false,
};
// configs.debug = true;

const dummyHost = configs.debug ? setupDummyHost() : undefined;

const store = createStore<{
  fftData: Float32Array | undefined;
  sampleRate: number;
  level: number;
  displayMode: number;
}>({
  fftData: undefined,
  sampleRate: 0,
  level: 0.5,
  displayMode: 1,
});

const actions = {
  setLevel(value: number) {
    store.setLevel(value);
  },
  shiftDisplayMode() {
    store.setDisplayMode((prev) => (prev + 1) % 2);
  },
};

function setupUnitInstance() {
  const unitInterface = getUnitInterface("wus-v02");
  if (unitInterface) {
    const audioContext = unitInterface.audioContext;
    store.setSampleRate(audioContext.sampleRate);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 1024;
    const getLevels = () => {
      const levels = new Float32Array(analyzer.frequencyBinCount);
      analyzer.getFloatFrequencyData(levels);
      return levels;
    };
    setInterval(() => {
      const fftData = getLevels();
      store.setFftData(fftData);
    }, 16);

    const gainNode = audioContext.createGain();
    unitInterface.primaryInputPort.audioInput.node.connect(gainNode);
    gainNode.connect(analyzer);
    analyzer.connect(unitInterface.primaryOutputPort.audioOutput.node);

    function updateGain(level: number) {
      gainNode.gain.value = mapKnobGainDb(level, 0.5);
    }

    updateGain(store.state.level);
    store.subscribe(({ level }) => {
      if (level !== undefined) {
        updateGain(level);
      }
    });

    unitInterface.completeSetup({
      unitAspects: {
        unitType: "effect",
        categoryHint: "effect",
        outputs: ["audio"],
        inputs: ["audio", "state"],
      },
      primaryInputPortHandlers: {
        stateInput: {
          emitStateBytes() {
            const dm = store.state.displayMode;
            return new Uint8Array([dm]);
          },
          applyStateBytes(bytes) {
            if (bytes.length === 1) {
              const dm = bytes[0] > 0 ? 1 : 0;
              store.setDisplayMode(dm);
            }
          },
        },
      },
    });
  }
}
setupUnitInstance();

const PanelRoot = () => {
  const { level, fftData, displayMode } = store.useSnapshot();
  return (
    <div className="@container w-full h-full flex-c bg-black">
      <div
        className="grow flex-c h-full max-h-[33cqw] px-4 py-2"
        onClick={actions.shiftDisplayMode}
      >
        <div className="w-full max-w-[400px] h-full">
          {displayMode === 0 && fftData && (
            <BasicSpectrumView fftData={fftData} />
          )}
          {displayMode === 1 && fftData && (
            <SegmentedSpectrumView
              nx={16}
              ny={10}
              gapX={1}
              gapY={1.5}
              fftData={fftData}
            />
          )}
        </div>
      </div>
      <div className="w-[19%] h-full flex-c bg-[#333] border border-[#fff2]">
        <ScalerBoxAutoSized>
          <div className="w-[50px] h-[50px] flex-c">
            <Knob value={level} onChange={actions.setLevel} />
          </div>
        </ScalerBoxAutoSized>
      </div>
    </div>
  );
};

const DevelopmentView = () => {
  return (
    <div className="flex-vc gap-8">
      <div className="w-[700px] h-[110px] border border-[#fff2]">
        <PanelRoot />
      </div>
      <div className="w-[400px] h-[250px] border border-[#fff2]">
        <PanelRoot />
      </div>
      {dummyHost && <dummyHost.ControlComponent />}
    </div>
  );
};

const App = () => {
  return (
    <div className="w-dvw h-dvh flex-c bg-black">
      {configs.debug ? <DevelopmentView /> : <PanelRoot />}
    </div>
  );
};

mountAppRoot(<App />);
