import { getUnitInterface } from "wus-unit-types";
import { createEffectsChain } from "./effects";
import type { SynthParams } from "./synth-params";
import { defaultParams } from "./synth-params";
import { createVoice, type Voice } from "./voice";

export const unitInterface = getUnitInterface("wus-v02");

function midiNoteToFrequency(note: number): number {
  return 440 * Math.pow(2, (note - 69) / 12);
}

interface VoiceSlot {
  voice: Voice;
  midiNote: number;
  startTime: number;
  state: "idle" | "playing" | "releasing";
}

export interface AudioEngine {
  noteOn(note: number, velocity: number): void;
  noteOff(note: number): void;
  updateParams(params: SynthParams): void;
}

const voiceCount = 6;

export function createAudioEngine(): AudioEngine {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  const destNode =
    unitInterface?.primaryOutputPort.audioOutput.node ??
    audioContext.destination;
  const effects = createEffectsChain(audioContext);
  effects.outputNode.connect(destNode);

  const slots: VoiceSlot[] = Array.from({ length: voiceCount }, () => ({
    voice: createVoice(audioContext),
    midiNote: -1,
    startTime: 0,
    state: "idle" as const,
  }));

  for (const slot of slots) {
    slot.voice.outputNode.connect(effects.inputNode);
  }

  const activeNotes = new Map<number, VoiceSlot>();
  let currentParams: SynthParams = { ...defaultParams };

  function ensureRunning(): void {
    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }
  }

  function findAvailableSlot(): VoiceSlot {
    // Prefer idle, then releasing, then steal oldest playing voice
    const idle = slots.find((s) => s.state === "idle");
    if (idle) return idle;

    const releasing = slots.find((s) => s.state === "releasing");
    if (releasing) {
      releasing.voice.forceStop();
      return releasing;
    }

    let oldest = slots[0];
    for (const slot of slots) {
      if (slot.startTime < oldest.startTime) oldest = slot;
    }
    activeNotes.delete(oldest.midiNote);
    oldest.voice.forceStop();
    return oldest;
  }

  function noteOn(note: number, velocity: number): void {
    ensureRunning();

    // Retrigger if this MIDI note is already playing
    const existing = activeNotes.get(note);
    if (existing) {
      existing.state = "idle";
      activeNotes.delete(note);
    }

    const slot = findAvailableSlot();
    const frequency = midiNoteToFrequency(note);
    slot.voice.noteOn(frequency, currentParams, velocity);
    slot.midiNote = note;
    slot.startTime = audioContext.currentTime;
    slot.state = "playing";
    activeNotes.set(note, slot);
  }

  function noteOff(note: number): void {
    const slot = activeNotes.get(note);
    if (!slot) return;

    slot.voice.noteOff(currentParams);
    slot.state = "releasing";
    activeNotes.delete(note);

    // Mark slot idle after release finishes
    const releaseMs = (0.05 + currentParams.ampRelease * 1.95 + 0.2) * 1000;
    const capturedSlot = slot;
    setTimeout(() => {
      if (capturedSlot.state === "releasing") capturedSlot.state = "idle";
    }, releaseMs);
  }

  function updateParams(params: SynthParams): void {
    currentParams = { ...params };
    effects.updateParams(params);
    for (const slot of slots) {
      slot.voice.updateParams(params);
    }
  }

  return { noteOn, noteOff, updateParams };
}
