import { AudioFetcher, LevelsLoader } from "@/definitions/interfaces";

export function createLevelsLoader(audioFetcher: AudioFetcher): LevelsLoader {
  return {
    async loadLevels(uri) {
      const buffer = await audioFetcher.fetchAudioBufferCached(uri);
      return [0.5, 0.3, 0.1, 0.2, 0.8, 0.3, 0.1];
    },
  };
}

// export type LevelsLoader = {
//   start(
//     sourceSpec: AudioSourceSpec,
//     itemCallback: (item: { audioIndex: number; levels: number[] }) => void,
//   ): void;
//   cancel(): void;
// };

// export function createLevelsLoader(): LevelsLoader {
//   let cancelled = false;

//   const internal = {
//     async loadLevels(url: string): Promise<number[]> {
//       // const buffer = await audioFetcher.fetchAudioBufferCached(url);
//       return [0.5, 0.3, 0.1, 0.2, 0.8, 0.3, 0.1];
//     },
//   };
//   return {
//     async start(sourceSpec, itemCallback) {
//       try {
//         const count = Math.min(sourceSpec.audioPaths.length, 12);
//         for (let i = 0; i < count; i++) {
//           const audioPath = sourceSpec.audioPaths[i];
//           const url = `${sourceSpec.baseUrl}${audioPath}`;
//           const levels = await internal.loadLevels(url);
//           if (cancelled) return;
//           itemCallback({ audioIndex: i, levels });
//           await delayMs(500);
//           if (cancelled) return;
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     cancel() {
//       cancelled = true;
//     },
//   };
// }
