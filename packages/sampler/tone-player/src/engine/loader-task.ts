import { AudioSourceSpec } from "@/definitions/interfaces";

function parseAudioSource(audioSourceText: string): AudioSourceSpec | string {
  //replace base url from github to jsDeliver
  //limit paths count to 12
  try {
    return {} as any;
  } catch {
    return `error`;
  }
}

// function createLoaderTaskModel() {
//   return {
//     loadAudioSource(sourceText: string) {
//       const res = parseAudioSource(sourceText);
//       if (typeof res === "string") {
//         actions.setErrorMessage(res);
//         return;
//         //if the source text is invalid, show error and keep the assigned slots as is
//       }
//       actions.setErrorMessage(null);

//       const sourceSpec = res;
//       // engine.setSourceSpec(sourceSpec);

//       actions.clearLevelsMap();
//       const levelsLoader = createLevelsLoader();
//       void levelsLoader.start(sourceSpec, (item) => {
//         actions.setLevels(item.audioIndex, item.levels);
//       });

//       return () => {
//         levelsLoader.cancel();
//       };
//     },
//   };
// }

// export function useSetupLoaderTask() {
//   const { audioSourceText } = store.useSnapshot();
//   const loaderTaskModel = useInstance(createLoaderTaskModel);
//   useEffect(() => {
//     return loaderTaskModel.loadAudioSource(audioSourceText);
//   }, [audioSourceText]);
// }
