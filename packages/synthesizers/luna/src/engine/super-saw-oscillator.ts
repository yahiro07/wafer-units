const VOICE_COUNT = 7;
const DETUNE_RATIOS = [0.0, 0.0146, 0.0381, 0.0883, -0.0146, -0.0381, -0.0883];
const PAN_DIRECTIONS = [0.0, 0.5, 0.75, 1.0, -0.5, -0.75, -1.0];
const UNISON_SPREAD = 1;
const VOICE_GAIN = (1 / Math.sqrt(7)) * 1.25;
const PHASE_RANDOM_MAX_SEC = 0.003;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function unisonDetuneCents(ratio: number, unisonDetune: number): number {
  return ratio * clamp01(unisonDetune) ** 2 * 1500;
}

export type SuperSawOscillator = {
  outputNode: GainNode;
  start: (
    frequencyHz: number,
    unisonDetune: number,
    time: number,
    mixLevel: number,
    randomizePhase?: boolean,
  ) => void;
  stop: (time?: number) => void;
  setPitch: (frequencyHz: number, unisonDetune: number, time: number) => void;
  setMixLevel: (time: number, mixLevel: number) => void;
  connectPitchMod: (source: AudioNode) => void;
  cleanup: () => void;
};

export function createSuperSawOscillator(
  audioContext: AudioContext,
): SuperSawOscillator {
  const outputNode = audioContext.createGain();
  outputNode.gain.value = 0;

  const hasPanner = typeof audioContext.createStereoPanner === "function";
  const gains: GainNode[] = [];
  const panners: Array<StereoPannerNode | undefined> = [];
  const oscillators: OscillatorNode[] = [];
  const pitchMods: AudioNode[] = [];

  let started = false;
  let stopped = false;
  let remaining = 0;
  let graphDisconnected = false;

  for (let i = 0; i < VOICE_COUNT; i += 1) {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = VOICE_GAIN;
    gains.push(gainNode);

    if (hasPanner) {
      const panner = audioContext.createStereoPanner();
      panner.pan.value = PAN_DIRECTIONS[i] * UNISON_SPREAD;
      gainNode.connect(panner);
      panner.connect(outputNode);
      panners.push(panner);
    } else {
      gainNode.connect(outputNode);
      panners.push(undefined);
    }
  }

  function disconnectGraph() {
    if (graphDisconnected) return;
    graphDisconnected = true;
    for (const gainNode of gains) {
      gainNode.disconnect();
    }
    for (const panner of panners) {
      panner?.disconnect();
    }
    outputNode.disconnect();
  }

  function finishOscillator(osc: OscillatorNode) {
    osc.disconnect();
    remaining -= 1;
    if (remaining <= 0) {
      disconnectGraph();
    }
  }

  return {
    outputNode,
    start(frequencyHz, unisonDetune, time, mixLevel, randomizePhase = true) {
      if (started) return;
      started = true;
      remaining = VOICE_COUNT;
      outputNode.gain.cancelScheduledValues(time);
      outputNode.gain.setValueAtTime(mixLevel, time);
      for (let i = 0; i < VOICE_COUNT; i += 1) {
        const osc = audioContext.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(frequencyHz, time);
        osc.detune.setValueAtTime(
          unisonDetuneCents(DETUNE_RATIOS[i], unisonDetune),
          time,
        );
        osc.connect(gains[i]);
        for (const source of pitchMods) {
          source.connect(osc.detune);
        }
        osc.onended = () => {
          finishOscillator(osc);
        };
        const startDelay =
          randomizePhase && i !== 0 ? Math.random() * PHASE_RANDOM_MAX_SEC : 0;
        osc.start(time + startDelay);
        oscillators.push(osc);
      }
    },
    stop(time?: number) {
      if (stopped) return;
      stopped = true;
      for (const osc of oscillators) {
        try {
          if (time === undefined) {
            osc.stop();
          } else {
            osc.stop(time);
          }
        } catch {
          finishOscillator(osc);
        }
      }
    },
    setPitch(frequencyHz, unisonDetune, time) {
      if (stopped) return;
      for (let i = 0; i < oscillators.length; i += 1) {
        const osc = oscillators[i];
        osc.frequency.setValueAtTime(frequencyHz, time);
        osc.detune.setValueAtTime(
          unisonDetuneCents(DETUNE_RATIOS[i], unisonDetune),
          time,
        );
      }
    },
    setMixLevel(time, mixLevel) {
      if (stopped) return;
      outputNode.gain.cancelScheduledValues(time);
      outputNode.gain.setValueAtTime(mixLevel, time);
    },
    connectPitchMod(source) {
      if (pitchMods.includes(source)) return;
      pitchMods.push(source);
      for (const osc of oscillators) {
        source.connect(osc.detune);
      }
    },
    cleanup() {
      if (!stopped) {
        for (const osc of oscillators) {
          osc.onended = null;
          try {
            osc.stop();
          } catch {
            // already stopped
          }
          osc.disconnect();
        }
        remaining = 0;
        stopped = true;
      }
      disconnectGraph();
    },
  };
}
