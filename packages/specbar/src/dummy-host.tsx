import { ReactNode, useState } from "react";
import { UnitInterface } from "wus-unit-types";

type DummyHost = {
  ControlComponent: () => ReactNode;
};

function createEngine() {
  const audioContext = new AudioContext();
  const audioSourceNode = audioContext.createGain();

  const unitInterface: UnitInterface = {
    audioContext,
    primaryOutputPort: {
      audioOutput: { node: audioContext.destination },
      noteOutput: {
        noteOn() {},
        noteOff() {},
      },
    } as unknown as UnitInterface["primaryOutputPort"],
    primaryInputPort: {
      audioInput: { node: audioSourceNode },
      setCallbacks() {},
      setHandlers() {},
    },
    declareUnitFeatures() {},
    completeSetup() {},
    completeSetupWithAttributes() {},
    setHostCallbacks() {},
    createMultiChannelOutputPorts() {
      throw new Error(`unsupported`);
    },
    createMultiChannelInputPorts() {
      throw new Error(`unsupported`);
    },
  };
  (window as any).unitInterface = unitInterface;

  let noiseSource: AudioBufferSourceNode | null = null;

  function stopNoise() {
    if (noiseSource) {
      noiseSource.stop();
      noiseSource.disconnect();
      noiseSource = null;
    }
  }

  function startNoise() {
    stopNoise();
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    noiseSource.connect(audioSourceNode);
    noiseSource.start();
  }

  return {
    async resumeIfNeed() {
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    },
    setPlayState(playing: boolean) {
      if (playing) {
        this.resumeIfNeed();
        startNoise();
      } else {
        stopNoise();
      }
    },
  };
}

function createControlComponent(engine: ReturnType<typeof createEngine>) {
  return () => {
    const [playing, setPlaying] = useState(false);
    const handleTogglePlay = () => {
      const next = !playing;
      engine.setPlayState(next);
      setPlaying(next);
    };
    return (
      <div>
        <button
          onClick={handleTogglePlay}
          className="px-4 py-2"
          style={{
            background: playing ? "#8af" : "#ccc",
          }}
        >
          play
        </button>
      </div>
    );
  };
}

export function setupDummyHost(): DummyHost {
  const engine = createEngine();
  const ControlComponent = createControlComponent(engine);
  return { ControlComponent };
}
