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
      const count = Math.min(sourceSpec.audioPaths.length, 12);
      for (let i = 0; i < count; i++) {
        const levels = await engine.loadLevels(i);
        if (cancelled) return;
        itemCallback({ audioIndex: i, levels });
        await delayMs(500);
        if (cancelled) return;
      }
    },
    cancel() {
      cancelled = true;
    },
  };
}
