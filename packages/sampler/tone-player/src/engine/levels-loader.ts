import { AudioFetcher, LevelsLoader } from "@/definitions/interfaces";
import { linearInterpolate, seqNumbers } from "@lib/mu2609/utils/helpers";

export function createLevelsLoader(audioFetcher: AudioFetcher): LevelsLoader {
  return {
    async loadLevels(uri) {
      const buffer = await audioFetcher.fetchAudioBufferCached(uri);
      const chData = buffer.getChannelData(0);
      const n = 200;
      return seqNumbers(n).map((i) => {
        const index = Math.round(
          linearInterpolate(i, 0, n - 1, 0, chData.length - 1),
        );
        return chData[index] ?? 0;
      });
    },
  };
}
