import { INoteVoice } from "./noteVoice";

interface INoteVoiceManager {
  noteOn(noteKey: string, time: number, voice: INoteVoice): void;
  noteOff(noteKey: string, time: number): void;
  updateVoices(): void;
}

export function createNoteVoiceManager(): INoteVoiceManager {
  const voices: Record<string, INoteVoice | undefined> = {};
  const releasingVoices: INoteVoice[] = [];

  return {
    noteOn(noteKey: string, time: number, voice: INoteVoice) {
      const oldVoice = voices[noteKey];
      if (oldVoice) {
        oldVoice.forceStop(time);
        releasingVoices.push(oldVoice);
      }
      voice.noteOn(time);
      voices[noteKey] = voice;
    },
    noteOff(noteKey: string, time: number) {
      const voice = voices[noteKey];
      if (voice) {
        voice.noteOff(time);
      }
    },
    updateVoices() {
      for (const noteKey in voices) {
        const voice = voices[noteKey];
        if (voice) {
          const done = voice.update();
          if (done) {
            delete voices[noteKey];
          }
        }
      }
      for (let i = releasingVoices.length - 1; i >= 0; i--) {
        const voice = releasingVoices[i];
        const done = voice.update();
        if (done) {
          releasingVoices.splice(i, 1);
        }
      }
    },
  };
}
