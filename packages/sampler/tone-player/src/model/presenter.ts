import { appModel } from "@/model/app-model";
import { resultOf } from "@lib/mu2609/utils/helpers";
import { useEffect, useState } from "preact/hooks";

export const presenter = {
  useLevels(audioIndex: number) {
    const [levels, setLevels] = useState<number[] | undefined>();
    useEffect(() => {
      if (audioIndex >= 0) {
        void resultOf(async () => {
          const levels = await appModel.getLevels(audioIndex);
          if (levels) {
            setLevels(levels);
          } else {
            setLevels(undefined);
          }
        });
      }
    }, [audioIndex]);
    return levels;
  },
};
