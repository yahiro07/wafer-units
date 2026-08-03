import { seqNumbers } from "mofur/ax";
import { createSequencerTickDriver } from "mofur/mx-audio";
import { UnitInterface } from "wafer-host/unit-types";
import { SongKeyMetaAttrs } from "@/types";

type SongKey = "Am" | "C" | "Dm" | "Em" | "F" | "G" | "B";

function checkKeyValid(key: string): SongKey | undefined {
  const valid = ["Am", "B", "C", "Dm", "Em", "F", "G"].includes(key as SongKey);
  return valid ? (key as SongKey) : undefined;
}

function getKeyRootNoteIndex(key: SongKey): number {
  const noteName = key.replace("m", "") as
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G";
  return {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  }[noteName];
}

function checkIsMinorChord(key: SongKey, chordRootNote: number): boolean {
  const isKeyMinor = key.endsWith("m");
  const keyRootNoteIndex = getKeyRootNoteIndex(key);
  const chordRootNoteIndex = chordRootNote % 12;
  const relativeIndex = (chordRootNoteIndex - keyRootNoteIndex + 12) % 12;
  if (!isKeyMinor) {
    //major key
    return [0, 2, 4, 9, 11].includes(relativeIndex);
  } else {
    //minor key
    return [0, 2, 5, 7].includes(relativeIndex);
  }
}

function applyDynamicNoteShift(
  rtfNote: number, //0 for root, 1 for third, 2 for fifth, 3 for root in next octave, etc.
  key: SongKey, //C, Am, etc.
  chordRootNote: number, //MIDI note number of the chord root
  octaveShift: number, // octave shift
): number {
  const isMinor = checkIsMinorChord(key, chordRootNote);
  const intervals = isMinor ? [0, 3, 7] : [0, 4, 7];
  const rtfOctave = Math.floor(rtfNote / 3);
  return (
    chordRootNote + intervals[rtfNote % 3] + (octaveShift + rtfOctave) * 12
  );
}

export function createSequencer(unitInterface: UnitInterface) {
  const state = {
    pattern: seqNumbers(8).map(() => 0),
    key: "Am",
    chordRootNote: 60 as number | undefined,
    octaveShift: 0,
    noteDuty: 0.9,
    bpm: 120,
    isClockInputActive: false,
    isInternalTickRunning: false,
  };

  const noteOutputPort = unitInterface.createNoteOutputPort();

  const sequencerTickDriver = createSequencerTickDriver(
    unitInterface.audioContext,
  );

  const core = {
    processStep(stepIndex: number, time: number, unitDuration: number) {
      const { pattern } = state;
      const rtfNote = pattern[stepIndex % pattern.length];
      const songKey = checkKeyValid(state.key);
      if (
        songKey &&
        rtfNote !== undefined &&
        state.chordRootNote !== undefined
      ) {
        const noteNumber = applyDynamicNoteShift(
          rtfNote,
          songKey,
          state.chordRootNote,
          state.octaveShift,
        );
        const endTime = time + unitDuration * state.noteDuty;
        noteOutputPort.noteOn(noteNumber, time, 1);
        noteOutputPort.noteOff(noteNumber, endTime);
      }
    },
  };

  return {
    inputNoteOn(note: number, _timeAt: number, _velocity: number) {
      // noteOutputPort.noteOn(note, timeAt, velocity);
      state.chordRootNote = note;
      if (!state.isClockInputActive) {
        sequencerTickDriver.setBpm(state.bpm);
        sequencerTickDriver.start({
          processStep: core.processStep,
        });
        state.isInternalTickRunning = true;
      }
    },
    inputNoteOff(_note: number, _timeAt: number) {
      state.chordRootNote = undefined;
      if (state.isInternalTickRunning) {
        // noteOutputPort.noteOff(note, timeAt);
        sequencerTickDriver.stop();
        state.isInternalTickRunning = false;
      }
    },
    clockStart() {
      state.isClockInputActive = true;
      if (state.isInternalTickRunning) {
        sequencerTickDriver.stop();
        state.isInternalTickRunning = false;
      }
    },
    clockStop() {
      state.isClockInputActive = false;
      state.chordRootNote = undefined;
    },
    processStep: core.processStep,
    setBpm(bpm: number) {
      state.bpm = bpm;
    },
    setMetaAttributes(attrs: SongKeyMetaAttrs) {
      if (attrs.songKey !== undefined) {
        state.key = attrs.songKey;
      }
    },
    setPattern(newPattern: number[]) {
      state.pattern = newPattern;
    },
    setOctaveShift(octaveShift: number) {
      state.octaveShift = octaveShift;
    },
    setNoteDuty(noteDuty: number) {
      state.noteDuty = noteDuty;
    },
  };
}
