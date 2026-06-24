import { UnitInterface } from "wafer-host/unit-types";
import { mapVolumeControlCurveCenterUnity } from "@/utils/curve";

export const debugGlobal = {
  gAudioContext: undefined as AudioContext | undefined,
};

export function createTonePlayer(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  debugGlobal.gAudioContext = audioContext;
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const toneCache = new Map<string, AudioBuffer | null>();

  return {
    async preloadTone(uri: string) {
      if (toneCache.has(uri)) {
        return;
      }
      const response = await fetch(uri);
      if (!response.ok) {
        console.error("failed to fetch", uri);
        toneCache.set(uri, null);
        return;
      }
      try {
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        toneCache.set(uri, audioBuffer);
      } catch (_) {
        console.error("failed to decode", uri);
        toneCache.set(uri, null);
      }

      // console.log("preloaded", uri);
    },
    playTone(uri: string, time: number, pitch: number, volume: number) {
      const audioBuffer = toneCache.get(uri);
      if (!audioBuffer) return;
      // console.log("playing", uri, time, pitch, volume);
      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;
      const speedRate = 2 ** (pitch * 2 - 1);
      sourceNode.playbackRate.value = speedRate;
      const gainNode = audioContext.createGain();
      const gainValue = mapVolumeControlCurveCenterUnity(volume);
      gainNode.gain.value = gainValue;
      sourceNode.connect(gainNode);
      gainNode.connect(destinationNode);
      sourceNode.start(time);
    },
  };
}
