import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAppContext } from "@/store/app-context";

export const DebugUi = () => {
  const { actions } = useAppContext();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) {
      actions.start();
      let stepIndex = 0;
      const timerId = setInterval(() => {
        actions.processStep(stepIndex, Date.now());
        stepIndex = stepIndex + 1;
      }, 125);
      return () => {
        clearInterval(timerId);
        actions.stop();
      };
    }
  }, [playing]);
  return (
    <div>
      <button
        className={clsx(
          "p-2 cursor-pointer",
          playing ? "bg-green-500" : "bg-gray-400",
        )}
        onClick={() => setPlaying(!playing)}
      >
        play
      </button>
    </div>
  );
};
