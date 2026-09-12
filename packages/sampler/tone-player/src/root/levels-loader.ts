import { AudioSourceSpec, SamplerEngine } from "@/definitions/types";
import { delayMs } from "@lib/mu2609/utils/timer-helper";

export type LevelsLoader = {
  start(
    sourceSpec: AudioSourceSpec,
    engine: SamplerEngine,
    itemCallback: (item: { audioIndex: number; levels: number[] }) => void,
  ): void;
  cancel(): void;
};

export function createLevelsLoader(): LevelsLoader {
  let cancelled = false;
  return {
    async start(sourceSpec, engine, itemCallback) {
      try {
        const count = Math.min(sourceSpec.audioPaths.length, 12);
        for (let i = 0; i < count; i++) {
          const audioPath = sourceSpec.audioPaths[i];
          const url = `${sourceSpec.baseUrl}${audioPath}`;
          const levels = await engine.loadLevels(url);
          if (cancelled) return;
          itemCallback({ audioIndex: i, levels });
          await delayMs(500);
          if (cancelled) return;
        }
      } catch (error) {
        console.error(error);
      }
    },
    cancel() {
      cancelled = true;
    },
  };
}
