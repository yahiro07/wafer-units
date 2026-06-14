import { seqNumbers } from "mofur/ax";
import { npx } from "mofur/ax-ui";
import { useEffect, useRef } from "react";

const PianoRollBackgroundOctaveBlock = ({
  cellW,
  cellH,
  nx,
}: {
  cellW: number;
  cellH: number;
  nx: number;
}) => {
  return (
    <div className="relative">
      {seqNumbers(7).map((yi) => {
        return (
          <div className="flex-h bg-[#fff]">
            {seqNumbers(nx).map((xi) => {
              return (
                <div
                  className="flex-c"
                  style={{
                    width: npx(cellW),
                    height: npx(cellH),
                    border: "0.5px solid #8881",
                    color: "#8884",
                    fontSize: npx(12),
                  }}
                >
                  {xi % 2 === 0 && (yi === 3 || yi === 6) && "・"}
                </div>
              );
            })}
          </div>
        );
      })}

      <div className="absolute-full flex-v">
        <div className="h-[57.14%] border-b border-[#ccc]" />
      </div>
      <div className="absolute-full flex-h">
        <div
          className="flex-h"
          style={{
            flexGrow: 1,
            border: "solid 0.5px #ccc",
            borderRight: "none",
            borderBottom: "none",
          }}
        >
          {seqNumbers(2).map(() => (
            <div style={{ flexGrow: 1, border: "solid 0.5px #ccc8" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BackgroundGridLayer = () => {
  const cellW = 20;
  const cellH = 16;
  const nx = 16;
  return (
    <div className="flex-v">
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
    </div>
  );
};

export const Dev3PianoRollEditorView = () => {
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    baseDiv.scrollTop = baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2;
  }, []);
  return (
    <div className="w-[420px] h-[240px] flex-c border border-cyan-600 bg-cyan-100/20">
      <div className="flex-v">
        <div
          ref={refBaseDiv}
          style={{ height: "160px", overflowX: "hidden", overflowY: "scroll" }}
        >
          <BackgroundGridLayer />
        </div>
      </div>
    </div>
  );
};
