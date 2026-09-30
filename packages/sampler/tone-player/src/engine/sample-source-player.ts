import {
  AudioFetcher,
  SampleSourcePlayer,
  SampleSourcePlayerTriggerOptions,
} from "@/definitions/interfaces";

export function createSampleSourcePlayer(
  audioContext: AudioContext,
  destinationNode: AudioNode,
  audioFetcher: AudioFetcher,
): SampleSourcePlayer {
  let currentUri: string | undefined;
  let audioBuffer: AudioBuffer | undefined;

  const cleanupFns: Set<() => void> = new Set();

  const internal = {
    async preload(uri: string) {
      if (uri !== currentUri) {
        audioBuffer = await audioFetcher.fetchAudioBufferCached(uri);
      }
    },
    trigger(options?: SampleSourcePlayerTriggerOptions) {
      if (!audioBuffer) return;

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = options?.speedRate ?? 1;
      source.connect(destinationNode);
      source.start(options?.time ?? audioContext.currentTime);

      const cleanupFn = () => {
        try {
          source.stop();
        } catch {}
        source.disconnect();
      };
      cleanupFns.add(cleanupFn);
      source.onended = () => {
        cleanupFn();
        cleanupFns.delete(cleanupFn);
      };
    },
  };
  return {
    setAudio(uri) {
      void internal.preload(uri);
    },
    trigger(options) {
      internal.trigger(options);
    },
    cleanup() {
      for (const cleanupFn of cleanupFns) {
        cleanupFn();
      }
      cleanupFns.clear();
    },
  };
}
