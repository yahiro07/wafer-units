import { IInstrumentParameters, INoteSampleSource } from './types';

export type INoteVoice = {
  noteOn(): void;
  noteOff(): void;
  update(elapsedMs: number): boolean;
  forceStop(): void;
};

function getNearestSampleSource(
  noteNumber: number,
  sampleSources: INoteSampleSource[]
) {
  const distances = sampleSources.map((it) =>
    Math.abs(it.noteNumber - noteNumber)
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
  destinationNode: AudioNode
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

  const samplesDurationMs =
    (sampleSource.samples.duration / playbackRate) * 1000;

  let hold = true;
  let releaseTick = 0;
  let lifeTick = 0;

  function setGainTransition(v0: number, v1: number, durationMs: number) {
    gain.gain.setValueAtTime(v0, audioContext.currentTime);
    const endTime = audioContext.currentTime + durationMs / 1000;
    gain.gain.linearRampToValueAtTime(v1, endTime);
  }

  const noteOn = () => {
    // console.log(`note on ${noteNumber}`);
    source.start(0);
    lifeTick = 0;
    // setGainTransition(0, noteGainTop, 60);
  };
  const noteOff = () => {
    // console.log(`note off ${noteNumber}`);
    hold = false;
    releaseTick = 0;
    setGainTransition(noteGainTop, 0, releaseTimeMs);
  };

  const stop = () => {
    source.stop();
    source.disconnect();
  };

  const forceStop = () => {
    hold = false;
    releaseTick = 0;
    releaseTimeMs = Math.min(releaseTimeMs, 50);
    setGainTransition(gain.gain.value, 0, releaseTimeMs);
  };

  const update = (elapsedMs: number): boolean => {
    if (!hold) {
      releaseTick += elapsedMs;
      const done = releaseTick > releaseTimeMs;
      if (done) {
        stop();
        return true;
      }
    }
    lifeTick += elapsedMs;
    if (!looped && lifeTick > samplesDurationMs) {
      stop();
      return true;
    }
    return false;
  };

  return { noteOn, noteOff, update, forceStop };
}
