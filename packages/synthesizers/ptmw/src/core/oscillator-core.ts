import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type OscillatorCoreSpec = {
  frequency?: number;
  waveform?: PeriodicWave;
  isPlaying?: boolean;
  volume?: number;
  pan?: number;
};

type OscillatorCore = {
  update(spec: OscillatorCoreSpec): void;
  cleanup(): void;
};

export function createOscillatorCore(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorCore {
  let osc: OscillatorNode | null = null;
  let latestWaveform: PeriodicWave | null = null;
  const gainNode = ac.createGain();
  const pannerNode = ac.createStereoPanner();
  connectNodes(gainNode, pannerNode, destinationNode);
  return {
    update(spec) {
      let oscCreated = false;
      if (!osc && spec.isPlaying) {
        osc = ac.createOscillator();
        if (latestWaveform) {
          osc.setPeriodicWave(latestWaveform);
        }
        oscCreated = true;
      }
      if (osc) {
        if (spec.frequency !== undefined) {
          if (osc.frequency.value !== spec.frequency) {
            osc.frequency.value = spec.frequency;
          }
        }
        if (oscCreated) {
          osc.connect(gainNode);
          osc.start();
        }
        if (spec.isPlaying === false) {
          osc.stop();
          osc.disconnect();
          osc = null;
        }
      }
      if (spec.waveform !== undefined) {
        if (osc && spec.waveform !== latestWaveform) {
          osc.setPeriodicWave(spec.waveform);
        }
        latestWaveform = spec.waveform;
      }
      if (spec.volume !== undefined) {
        gainNode.gain.value = spec.volume;
      }
      if (spec.pan !== undefined) {
        pannerNode.pan.value = spec.pan;
      }
    },
    cleanup() {
      if (osc) {
        osc.disconnect();
        osc = null;
      }
      disconnectNodes(gainNode, pannerNode, destinationNode);
    },
  };
}
