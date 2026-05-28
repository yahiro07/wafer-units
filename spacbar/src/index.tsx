import { mountAppRoot } from "@beam/ax-react";
import "./styles";
import { linearInterpolate } from "@beam/ax/number-utils";
import { createStore } from "snap-store";
import { getHostInterface } from "wus-unit-types";
import { BasicSpectrumView } from "@/basic-spectrum-view";
import { Knob } from "@/components/knob";
import { setupDummyHost } from "@/dummy-host";
import { ScalerBoxAutoSized } from "@/scaler-box-auto-sized";

const dummyHost = setupDummyHost();

const store = createStore<{
  fftData: Float32Array | undefined;
  sampleRate: number;
  level: number;
}>({
  fftData: undefined,
  sampleRate: 0,
  level: 0.5,
});

const actions = {
  setLevel(value: number) {
    store.setLevel(value);
  },
};

function mapKnobGainDb(
  value: number,
  knobCenter: number,
  dbTop = 12,
  dbBottom = -80,
) {
  let db = 0;
  if (value > knobCenter) {
    db = linearInterpolate(value, knobCenter, 1, 0, dbTop);
  } else {
    db = linearInterpolate(value, 0, knobCenter, dbBottom, 0);
  }
  return Math.pow(10, db / 20);
}

function setupUnitInstance() {
  const hostInterface = getHostInterface();
  if (hostInterface) {
    const audioContext = hostInterface.audioContext;
    store.assigns({ sampleRate: audioContext.sampleRate });
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 1024;
    const getLevels = () => {
      const levels = new Float32Array(analyzer.frequencyBinCount);
      analyzer.getFloatFrequencyData(levels);
      return levels;
    };
    setInterval(() => {
      const fftData = getLevels();
      store.assigns({ fftData });
    }, 16);

    const gainNode = audioContext.createGain();
    hostInterface.audioSourceNode.connect(gainNode);
    gainNode.connect(analyzer);
    analyzer.connect(hostInterface.audioDestinationNode);

    hostInterface.setupUnitAgent({ type: "effect" });

    function updateGain(level: number) {
      gainNode.gain.value = mapKnobGainDb(level, 0.5);
    }

    updateGain(store.state.level);
    store.subscribe(({ level }) => {
      if (level !== undefined) {
        updateGain(level);
      }
    });
  }
}
setupUnitInstance();

const PanelRoot = () => {
  const { level, fftData } = store.useSnapshot();
  return (
    <div className="@container w-full h-full flex-c bg-black">
      <div className="grow h-full max-h-[33cqw] border border-[#fff2] px-4 py-2">
        {fftData && <BasicSpectrumView fftData={fftData} />}
      </div>
      <div className="w-[20%] h-full flex-c bg-[#333] border border-[#fff2]">
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
      <div className="w-[550px] h-[100px] border border-[#fff2]">
        <PanelRoot />
      </div>
      <div className="w-[400px] h-[250px] border border-[#fff2]">
        <PanelRoot />
      </div>
      <dummyHost.ControlComponent />
    </div>
  );
};

const App = () => {
  return (
    <div className="w-dvw h-dvh flex-c bg-black">
      {0 ? <PanelRoot /> : <DevelopmentView />}
    </div>
  );
};

mountAppRoot(<App />);
