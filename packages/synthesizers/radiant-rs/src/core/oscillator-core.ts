import {
  connectNodes,
  disconnectNodes,
} from "@lib/mu2609/utils/webaudio-helper";

type OscillatorCoreSpec = {
  frequency?: number;
  detune?: number;
  waveform?: PeriodicWave;
  isPlaying?: boolean;
  volume?: number;
  pan?: number;
};

type OscillatorCore = {
  update(spec: OscillatorCoreSpec, time: number): void;
  cleanup(): void;
};

export function createOscillatorCore(
  ac: AudioContext,
  destinationNode: AudioNode,
): OscillatorCore {
  let prevOsc: OscillatorNode | null = null;
  let osc: OscillatorNode | null = null;
  let lastSetWaveform: PeriodicWave | null = null;
  const gainNode = ac.createGain();
  const pannerNode = ac.createStereoPanner();
  connectNodes(gainNode, pannerNode, destinationNode);
  return {
    update(spec, time) {
      let oscCreated = false;
      if (!osc && spec.isPlaying) {
        if (prevOsc) {
          const node = prevOsc;
          prevOsc = null;
          node.onended = null;
          node.disconnect();
        }
        osc = ac.createOscillator();
        lastSetWaveform = null;
        oscCreated = true;
      }
      if (osc) {
        if (spec.frequency !== undefined) {
          if (osc.frequency.value !== spec.frequency) {
            osc.frequency.value = spec.frequency;
          }
        }
        if (spec.detune !== undefined) {
          if (osc.detune.value !== spec.detune) {
            osc.detune.value = spec.detune;
          }
        }
        if (spec.waveform && spec.waveform !== lastSetWaveform) {
          osc.setPeriodicWave(spec.waveform);
          lastSetWaveform = spec.waveform;
        }

        if (oscCreated) {
          osc.connect(gainNode);
          osc.start(time);
        }
        if (spec.isPlaying === false) {
          osc.stop(time);
          prevOsc = osc;
          osc = null;
          prevOsc.onended = () => {
            prevOsc?.disconnect();
            prevOsc = null;
          };
        }
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
