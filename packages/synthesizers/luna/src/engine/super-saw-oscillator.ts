const VOICE_COUNT = 7;
const DETUNE_RATIOS = [0.0, 0.0146, 0.0381, 0.0883, -0.0146, -0.0381, -0.0883];
const PAN_DIRECTIONS = [0.0, 0.5, 0.75, 1.0, -0.5, -0.75, -1.0];
const UNISON_SPREAD = 1;
const VOICE_GAIN = (1 / Math.sqrt(7)) * 1.5;
const PHASE_RANDOM_MAX_SEC = 0.003;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function unisonDetuneCents(ratio: number, unisonDetune: number): number {
  return ratio * clamp01(unisonDetune) ** 2 * 1500;
}

export function createSuperSawOscillator(audioContext: AudioContext) {
  const outputNode = audioContext.createGain();
  outputNode.gain.value = 0;

  const hasPanner = typeof audioContext.createStereoPanner === "function";
  const gains: GainNode[] = [];
  const panners: Array<StereoPannerNode | undefined> = [];
  let oscillators: OscillatorNode[] = [];
  const pitchMods: AudioNode[] = [];

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

  function stopOscillators(time?: number) {
    const previous = oscillators;
    oscillators = [];
    for (const osc of previous) {
      osc.onended = () => {
        osc.disconnect();
      };
      try {
        if (time === undefined) {
          osc.stop();
        } else {
          osc.stop(time);
        }
      } catch {
        osc.disconnect();
      }
    }
  }

  function applyPitch(frequencyHz: number, unisonDetune: number, time: number) {
    for (let i = 0; i < oscillators.length; i += 1) {
      const osc = oscillators[i];
      osc.frequency.setValueAtTime(frequencyHz, time);
      osc.detune.setValueAtTime(
        unisonDetuneCents(DETUNE_RATIOS[i], unisonDetune),
        time,
      );
    }
  }

  return {
    outputNode,
    setEnabled(enabled: boolean, time: number, mixLevel = 1) {
      outputNode.gain.setValueAtTime(enabled ? mixLevel : 0, time);
      if (!enabled) {
        stopOscillators(time);
      }
    },
    setPitch(frequencyHz: number, unisonDetune: number, time: number) {
      applyPitch(frequencyHz, unisonDetune, time);
    },
    connectPitchMod(source: AudioNode) {
      if (!pitchMods.includes(source)) {
        pitchMods.push(source);
      }
      for (const osc of oscillators) {
        source.connect(osc.detune);
      }
    },
    retrigger(
      frequencyHz: number,
      unisonDetune: number,
      time: number,
      randomizePhase = true,
    ) {
      stopOscillators(time);
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
        const startDelay =
          randomizePhase && i !== 0 ? Math.random() * PHASE_RANDOM_MAX_SEC : 0;
        osc.start(time + startDelay);
        oscillators.push(osc);
      }
    },
    cleanup() {
      stopOscillators();
      for (const gainNode of gains) {
        gainNode.disconnect();
      }
      for (const panner of panners) {
        panner?.disconnect();
      }
      outputNode.disconnect();
    },
  };
}
