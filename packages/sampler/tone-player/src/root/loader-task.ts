import { AudioSourceSpec } from "@/definitions/types";
import { engine } from "@/root/engine-instance";
import { store } from "@/root/store";
import { createLevelsLoader, LevelsLoader } from "@/root/levels-loader";
import { useEffect } from "preact/hooks";
import { useInstance } from "@lib/mu2609/utils/hooks";

function parseAudioSource(audioSourceText: string): AudioSourceSpec | string {
  //replace base url from github to jsDeliver

  //limit paths count to 12

  return `error`;
}

function createLoaderTaskModel() {
  let waveformLoader: LevelsLoader | null = null;
  return {
    loadAudioSource(sourceText: string) {
      const res = parseAudioSource(sourceText);
      if (typeof res === "string") {
        store.setErrorMessage(res);
        return;
      }
      const sourceSpec = res;
      engine.setSourceSpec(sourceSpec);
      if (waveformLoader) {
        waveformLoader.cancel();
      }
      waveformLoader = createLevelsLoader();
      waveformLoader.start(sourceSpec, engine, (item) => {
        store.patchLevelsMap({ [item.audioIndex]: item.levels });
      });
    },
  };
}

export function useSetupLoaderTask() {
  const { audioSourceText } = store.useSnapshot();
  const loaderTaskModel = useInstance(createLoaderTaskModel);
  useEffect(() => {
    loaderTaskModel.loadAudioSource(audioSourceText);
  }, [audioSourceText]);
}
