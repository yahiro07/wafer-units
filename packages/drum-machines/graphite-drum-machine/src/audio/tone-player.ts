import { UnitInterface } from "wafer-host/unit-types";
import { PieceId } from "@/base/type";
import { mapVolumeControlCurveCenterUnity } from "@/utils/curve";
import { getUriQueryValue } from "@/utils/get-uri-query-value";

export const debugGlobal = {
  gAudioContext: undefined as AudioContext | undefined,
};

type ToneItem = {
  audioBuffer: AudioBuffer | null;
  volume: number;
};

export function createTonePlayer(unitInterface: UnitInterface | undefined) {
  const audioContext = unitInterface?.audioContext ?? new AudioContext();
  debugGlobal.gAudioContext = audioContext;
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;

  const masterGainNode = audioContext.createGain();
  masterGainNode.gain.value = 0.5;
  masterGainNode.connect(destinationNode);

  const kickOutputNode =
    false && unitInterface?.createAdditionalAudioOutputNode("kick");
  const toneCache = new Map<string, ToneItem | null>();

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
      const volumeText = getUriQueryValue(uri, "vol");
      const volume = volumeText ? parseFloat(volumeText) / 100 : 1;
      try {
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        toneCache.set(uri, { audioBuffer, volume });
      } catch {
        console.error("failed to decode", uri);
        toneCache.set(uri, null);
      }

      // console.log("preloaded", uri);
    },
    playTone(
      uri: string,
      time: number,
      pitch: number,
      volume: number,
      pieceId: PieceId,
    ) {
      const toneItem = toneCache.get(uri);
      if (!toneItem) return;
      // console.log("playing", uri, time, pitch, volume);
      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = toneItem.audioBuffer;
      const speedRate = 2 ** ((pitch * 2 - 1) * 0.5);
      sourceNode.playbackRate.value = speedRate;
      const gainNode = audioContext.createGain();
      const gainValue =
        toneItem.volume * mapVolumeControlCurveCenterUnity(volume);
      gainNode.gain.value = gainValue;
      sourceNode.connect(gainNode);
      gainNode.connect(masterGainNode);
      if (kickOutputNode && pieceId === "kick") {
        sourceNode.connect(kickOutputNode);
      }
      sourceNode.start(time);
    },
    setMasterVolume(value: number) {
      const gainValue = mapVolumeControlCurveCenterUnity(value);
      masterGainNode.gain.setTargetAtTime(
        gainValue,
        audioContext.currentTime,
        0.005,
      );
    },
  };
}
