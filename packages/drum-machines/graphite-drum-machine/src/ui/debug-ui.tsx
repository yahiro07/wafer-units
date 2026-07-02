import clsx from "clsx";
import { useEffect, useState } from "react";
import { debugGlobal } from "@/audio/tone-player";
import { pieceSampleUrls } from "@/base/piece-sample-urls";
import { useAppContext } from "@/store/app-context";

const PlayButton = () => {
  const { actions } = useAppContext();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      debugGlobal.gAudioContext?.resume();
      actions.start();
      let stepIndex = 0;
      const timerId = setInterval(() => {
        actions.processStep(stepIndex, 0);
        stepIndex = stepIndex + 1;
      }, 110);
      return () => {
        clearInterval(timerId);
        actions.stop();
      };
    }
  }, [playing]);
  return (
    <button
      className={clsx(
        "p-2 cursor-pointer",
        playing ? "bg-green-500" : "bg-gray-400",
      )}
      onClick={() => setPlaying(!playing)}
    >
      play
    </button>
  );
};

const SampleNamesDisplay = () => {
  const { store } = useAppContext();
  const { pieces } = store.useSnapshot();
  return (
    <div>
      {pieces.map((piece) => {
        return (
          <div>
            {piece.id}: {pieceSampleUrls[piece.id][piece.variationIndex]}
          </div>
        );
      })}
    </div>
  );
};

export const DebugUi = () => {
  return (
    <div className="w-full flex-c">
      <div className="flex-ha gap-8">
        <PlayButton />
        <SampleNamesDisplay />
      </div>
    </div>
  );
};
