import { createLoopIntervalMonitor } from '~/funcs';
import { INoteVoice } from './noteVoice';

interface INoteVoiceManager {
  noteOn(noteKey: string, voice: INoteVoice): void;
  noteOff(noteKey: string): void;
  updateVoices(): void;
}

export function createNoteVoiceManager(): INoteVoiceManager {
  const voices: Record<string, INoteVoice | undefined> = {};
  const loopIntervalMonitor = createLoopIntervalMonitor();

  return {
    noteOn(noteKey: string, voice: INoteVoice) {
      const oldVoice = voices[noteKey];
      if (oldVoice) {
        oldVoice.forceStop();
        delete voices[noteKey];
      }
      voice.noteOn();
      voices[noteKey] = voice;
    },
    noteOff(noteKey: string) {
      const voice = voices[noteKey];
      if (voice) {
        voice.noteOff();
      }
    },
    updateVoices() {
      const elapsedMs = loopIntervalMonitor.next();
      for (const noteKey in voices) {
        const voice = voices[noteKey];
        if (voice) {
          const done = voice.update(elapsedMs);
          if (done) {
            delete voices[noteKey];
          }
        }
      }
    },
  };
}
