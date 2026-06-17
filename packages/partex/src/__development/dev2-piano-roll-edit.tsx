import { useEffect, useRef } from "react";
import { PianoRollBackgroundOctaveBlock } from "@/components/piano-roll-background-octave-block";

const BackgroundGridLayer = () => {
  const cellW = 44;
  const cellH = 44;
  const nx = 16;
  return (
    <div className="flex-v">
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
    </div>
  );
};

export const Dev2PianoRollEdit = () => {
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    baseDiv.scrollTop = baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2;
  }, []);
  return (
    <div className="w-[800px] h-[500px] flex-c border border-cyan-600 bg-cyan-100/20">
      <div className="flex-v">
        piano-roll
        <div
          ref={refBaseDiv}
          style={{ height: "300px", overflowX: "hidden", overflowY: "scroll" }}
        >
          <BackgroundGridLayer />
        </div>
      </div>
    </div>
  );
};
