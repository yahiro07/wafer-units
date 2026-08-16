import { IInstrumentParameters, INoteSampleSource } from "./types";

export type INoteVoice = {
  noteOn(time: number): void;
  noteOff(time: number): void;
  update(): boolean;
  forceStop(time: number): void;
};

function getNearestSampleSource(
  noteNumber: number,
  sampleSources: INoteSampleSource[],
) {
  const distances = sampleSources.map((it) =>
    Math.abs(it.noteNumber - noteNumber),
  );
  const minDistance = Math.min(...distances);
  const index = distances.indexOf(minDistance);
  return sampleSources[index];
}

export function createPitchShiftedNoteVoice(
  audioContext: AudioContext,
  noteNumber: number,
  samplesSources: INoteSampleSource[],
  toneParameters: IInstrumentParameters,
  gainAdjustment: number,
  destinationNode: AudioNode,
): INoteVoice {
  const sr = audioContext.sampleRate;
  const sampleSource = getNearestSampleSource(noteNumber, samplesSources);
  const originalNoteNumber = sampleSource.noteNumber;
  // console.log(`play note ${noteNumber} based on ${originalNoteNumber}`);
  const playbackRate = Math.pow(2, (noteNumber - originalNoteNumber) / 12);
  const source = audioContext.createBufferSource();
  source.buffer = sampleSource.samples;
  source.playbackRate.value = playbackRate;

  const { loopSpec } = sampleSource;
  if (loopSpec) {
    source.loop = true;
    source.loopStart = loopSpec.posLoopStart / sr;
    source.loopEnd = loopSpec.posLoopEnd / sr;
  }
  const looped = !!loopSpec;

  const { volume, release } = toneParameters;
  const noteGainTop = volume * gainAdjustment;
  let releaseTimeMs = release * release * 3000;

  const gain = audioContext.createGain();
  gain.gain.value = noteGainTop;
  source.connect(gain).connect(destinationNode);

  const samplesDurationSec = sampleSource.samples.duration / playbackRate;

  let noteStartTime: number;
  let noteEndTime: number | undefined;

  function setGainTransition(
    time: number,
    v0: number,
    v1: number,
    durationMs: number,
  ) {
    gain.gain.setValueAtTime(v0, time);
    const endTime = time + durationMs / 1000;
    gain.gain.linearRampToValueAtTime(v1, endTime);
  }

  const noteOn = (time: number) => {
    source.start(time);
    noteStartTime = time;
  };
  const noteOff = (time: number) => {
    noteEndTime = time;
    setGainTransition(time, noteGainTop, 0, releaseTimeMs);
  };

  const stop = () => {
    source.stop();
    source.disconnect();
  };

  const forceStop = (time: number) => {
    noteEndTime = time;
    releaseTimeMs = Math.min(releaseTimeMs, 50);
    setGainTransition(time, gain.gain.value, 0, releaseTimeMs);
  };

  const update = (): boolean => {
    if (noteEndTime !== undefined) {
      const done =
        audioContext.currentTime >= noteEndTime + releaseTimeMs / 1000;
      if (done) {
        stop();
        return true;
      }
    }
    const lifeTick = audioContext.currentTime - noteStartTime;
    if (!looped && lifeTick > samplesDurationSec) {
      stop();
      return true;
    }
    return false;
  };

  return { noteOn, noteOff, update, forceStop };
}
