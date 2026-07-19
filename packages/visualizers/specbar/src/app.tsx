import { ScalerBoxAutoSized } from "mofur/mo-react";
import { createStore } from "snap-store";
import { UnitInterface } from "wafer-host/unit-types";
import { Knob } from "@/components/knob";
import { mapKnobCurveCenterUnity } from "@/curve";
import { setupDummyHost } from "@/dummy-host";
import { BasicSpectrumView } from "@/organisms/basic-spectrum-view";
import { SegmentedSpectrumView } from "@/organisms/segmented-spectrum-view";

export function createApp(unitInterface: UnitInterface) {
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
    unitInterface.audioInputNode.connect(gainNode);
    gainNode.connect(analyzer);
    analyzer.connect(unitInterface.audioOutputNode);

    function updateGain(level: number) {
      gainNode.gain.value = mapKnobCurveCenterUnity(level);
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
      },
      persistence: {
        emitStateBytes() {
          const { displayMode: dm, level } = store.state;
          return new Uint8Array([dm, Math.round(level * 255)]);
        },
        applyStateBytes(bytes) {
          if (bytes.length === 2) {
            const dm = bytes[0] > 0 ? 1 : 0;
            const level = bytes[1] / 255;
            store.assign({ displayMode: dm, level });
          }
        },
      },
    });
  }
  setupUnitInstance();

  const PanelRoot = () => {
    const { level, fftData, displayMode } = store.useSnapshot();
    return (
      <div className="w-[350px] h-[55px]">
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
    return configs.debug ? <DevelopmentView /> : <PanelRoot />;
  };

  return { App };
}
