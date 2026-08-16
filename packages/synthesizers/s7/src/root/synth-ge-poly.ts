type SynthParameters = {
  octave: number; // -2, -1, 0, 1, 2
  unisonDetune: number; // 0~1
  unisonSpread: number; // 0~1
  unisonMix: number; // 0~1
  phaseRandom: boolean;
  ampRelease: number; // 0~1 (mapped to seconds)
  volume: number; // 0~1
};

export function createSynthesizerGePoly(
  audioContext: AudioContext,
  initialParameters: SynthParameters,
) {
  const state: {
    parameters: SynthParameters;
  } = {
    parameters: initialParameters,
  };

  // Main gain node that sums the final output
  const outputNode = audioContext.createGain();

  // Map of active notes (MIDI note number -> note object)
  type ActiveNote = {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    gateGain: GainNode; // For envelope
  };
  const activeNotes = new Map<number, ActiveNote>();

  // JP-8000 SuperSaw detune ratios relative to center (0)
  // 7 voices: center (0), 3 right (+), 3 left (-)
  const DETUNE_RATIOS = [
    0.0, 0.0146, 0.0381, 0.0883, -0.0146, -0.0381, -0.0883,
  ];

  // Pan positions (center, spread right, spread left)
  const PAN_DIRECTIONS = [0.0, 0.5, 0.75, 1.0, -0.5, -0.75, -1.0];

  // Apply parameters
  function applyParameters() {
    const p = state.parameters;
    // Update main volume (applied immediately)
    outputNode.gain.setValueAtTime(p.volume, audioContext.currentTime);

    // To dynamically update detune, pan, and mix on notes already playing,
    // you could loop over activeNotes here and apply changes in real time.
    // For load and complexity reasons, changes take effect on the next noteOn.
  }

  // Apply initial parameters
  applyParameters();

  // Frequency conversion helper
  function midiNoteToFrequency(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  return {
    outputNode,

    setParameters(parameters: SynthParameters) {
      state.parameters = parameters;
      applyParameters();
    },

    noteOn(noteNumber: number, time: number) {
      // If the same note is already playing, stop it first (voice retrigger)
      if (activeNotes.has(noteNumber)) {
        this.noteOff(noteNumber, time);
      }

      const p = state.parameters;
      const startTime = Math.max(time, audioContext.currentTime);

      // Apply octave offset
      const finalNote = noteNumber + p.octave * 12;
      const baseFrequency = midiNoteToFrequency(finalNote);

      // Gain node for the note envelope
      const gateGain = audioContext.createGain();

      // Attack = 0, Sustain = 1 (fixed)
      gateGain.gain.setValueAtTime(0, startTime);
      gateGain.gain.setValueAtTime(1, startTime); // Attack 0, so jump to 1 immediately
      gateGain.connect(outputNode);

      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      // Generate 7 sawtooth oscillators
      for (let i = 0; i < 7; i++) {
        const osc = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const panner = audioContext.createStereoPanner
          ? audioContext.createStereoPanner()
          : null;

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(baseFrequency, startTime);

        // --- Detune ---
        // Scale to cents based on JP-8000 max detune width (~100 cents at max)
        // Multiply by unisonDetune (0~1)
        const detuneCents = DETUNE_RATIOS[i] * p.unisonDetune ** 2 * 1200;
        osc.detune.setValueAtTime(detuneCents, startTime);

        // --- Phase randomization (PeriodicWave emulation) ---
        // Web Audio oscillators normally start at phase 0.
        // When perfectly aligned, the attack is very sharp (effectively click noise).
        // When phaseRandom is true, a small random start delay shifts each oscillator's phase.
        const startDelay = p.phaseRandom ? Math.random() * 0.02 : 0; // Up to 20ms offset

        // --- Mix (gain) ---
        const sideGain = i === 0 ? 1 : p.unisonMix;
        const normalization = Math.sqrt(1 + p.unisonMix ** 2 * 6);
        const normalizedGain = sideGain / normalization;

        gainNode.gain.setValueAtTime(normalizedGain, startTime);

        // --- Stereo spread ---
        if (panner) {
          const panVal = PAN_DIRECTIONS[i] * p.unisonSpread;
          panner.pan.setValueAtTime(panVal, startTime);

          osc.connect(gainNode);
          gainNode.connect(panner);
          panner.connect(gateGain);
        } else {
          // Fallback when StereoPannerNode is unavailable
          osc.connect(gainNode);
          gainNode.connect(gateGain);
        }

        osc.start(startTime + startDelay);

        oscillators.push(osc);
        gains.push(gainNode);
      }

      // Store active note
      activeNotes.set(noteNumber, { oscillators, gains, gateGain });
    },

    noteOff(noteNumber: number, time: number) {
      const note = activeNotes.get(noteNumber);
      if (!note) return;

      const p = state.parameters;
      const stopTime = Math.max(time, audioContext.currentTime);

      // Map ampRelease (0~1) to seconds (e.g. up to ~3s release)
      const releaseTimeSeconds = p.ampRelease ** 2 * 3.0;
      const finishTime = stopTime + releaseTimeSeconds;

      // Ramp gain from current value to 0 (linear release)
      note.gateGain.gain.cancelScheduledValues(stopTime);
      note.gateGain.gain.setValueAtTime(note.gateGain.gain.value, stopTime);
      note.gateGain.gain.linearRampToValueAtTime(0, finishTime);

      // Stop oscillators after release and free resources
      note.oscillators.forEach((osc) => {
        osc.stop(finishTime);
      });

      // Remove from map
      activeNotes.delete(noteNumber);
    },

    cleanup() {
      // Stop all sounding notes immediately and clear
      activeNotes.forEach((note) => {
        note.oscillators.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // Ignore exception if already stopped
          }
        });
        note.gateGain.disconnect();
      });
      activeNotes.clear();
      outputNode.disconnect();
    },
  };
}
