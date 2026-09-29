import { AudioFetcher } from "@/definitions/interfaces";
import { resultOf } from "@lib/mu2609/utils/helpers";

export function createAudioFetcher(audioContext: AudioContext): AudioFetcher {
  const audioBufferPromises: Record<string, Promise<AudioBuffer>> = {};

  return {
    async fetchAudioBufferCached(uri) {
      let promise = audioBufferPromises[uri];
      if (!promise) {
        promise = resultOf(async () => {
          const response = await fetch(uri);
          const arrayBuffer = await response.arrayBuffer();
          return await audioContext.decodeAudioData(arrayBuffer);
        });
        audioBufferPromises[uri] = promise;
      }
      return await promise;
    },
  };
}
