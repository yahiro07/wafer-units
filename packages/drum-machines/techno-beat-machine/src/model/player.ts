import { PartItem } from "@/model/defs";

function delayMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRateFromPitch(pitch: number) {
  return Math.pow(2, (pitch * 100) / 1200);
}

export function createPlayer() {
  const audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.value = 0.5;

  const buffersMap = new Map<string, AudioBuffer>();

  const core = {
    async preloadSamples(partItems: PartItem[]) {
      for (const partItem of partItems) {
        if (!buffersMap.has(partItem.sampleKey)) {
          const response = await fetch(`/samples/${partItem.sampleKey}.ogg`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          buffersMap.set(partItem.sampleKey, audioBuffer);
        }
      }
    },
    handleStep(partItems: PartItem[], stepIndex: number) {
      for (const partItem of partItems) {
        const audioBuffer = buffersMap.get(partItem.sampleKey);
        if (!audioBuffer) {
          console.error("audio buffer not found", partItem.sampleKey);
          return;
        }
        const localIndex = stepIndex % partItem.notes.length;
        const note = partItem.notes[localIndex];
        if (note) {
          const speedRate = getRateFromPitch(partItem.pitchTweak + note.pitch);
          const volume = partItem.volume;
          const velocity = note.velocity === 0.5 ? partItem.weakVelocity : 1;
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.playbackRate.value = speedRate;
          const gainNode = audioContext.createGain();
          gainNode.gain.value = volume * velocity * velocity;
          source.connect(gainNode);
          gainNode.connect(masterGain);
          source.start();
        }
      }
    },
  };

  return {
    async play(partItems: PartItem[]) {
      await core.preloadSamples(partItems);
      console.log("play start");
      const bpm = 120;
      const stepDurationSec = 60 / bpm / 4;
      const maxLength = Math.max(...partItems.map((item) => item.notes.length));
      for (let i = 0; i < maxLength; i++) {
        console.log("step");
        core.handleStep(partItems, i);
        await delayMs(stepDurationSec * 1000);
      }
      console.log("play done");
    },
  };
}
