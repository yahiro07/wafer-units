import { appModel } from "@/model/app-model";
import { resultOf } from "@lib/mu2609/utils/helpers";
import { useEffect, useState } from "preact/hooks";

export const presenter = {
  useLevels(audioIndex: number) {
    const [levels, setLevels] = useState<number[]>([]);
    useEffect(() => {
      void resultOf(async () => {
        const levels = await appModel.getLevels(audioIndex);
        setLevels(levels);
      });
    }, [audioIndex]);
    return levels;
  },
};
