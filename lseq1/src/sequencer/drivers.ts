import { setupMidiKeyboardInput } from "beams/mx-audio/midi-keyboard-input";
import { hostInterface } from "@/sequencer/target-synthesizer";
import { actions } from "@/store/actions";
import { sequencerEngine } from "@/store/store";

export const drivers = {
  setupHostInterface() {
    if (hostInterface) {
      hostInterface.setupUnitAgent({
        type: "sequencer",
        categoryHint: "stepSequencer",
        setBpm(bpm) {
          actions.setBpm(bpm);
        },
        setPlayState(playing) {
          actions.setExPlaying(playing);
          if (!playing) {
            sequencerEngine.allNotesOff();
          }
        },
        transportHandling: { processStep: actions.wrapProcessStep },
      });
    }
  },
  setupMidiKeyboardInput() {
    if (!hostInterface) {
      return setupMidiKeyboardInput({
        noteOn: actions.noteOn,
        noteOff: actions.noteOff,
      });
    }
  },
  setupAll() {
    drivers.setupHostInterface();
    const closeMidiIn = drivers.setupMidiKeyboardInput();
    return () => {
      closeMidiIn?.();
    };
  },
};
