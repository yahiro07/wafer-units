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
      {seqNumbers(12).map((yi) => {
        const _yi = 12 - yi - 1;
        const isBlackKey = [1, 3, 6, 8, 10].includes(_yi);
        return (
          <div
            className="flex-h"
            style={{
              background: isBlackKey ? "#ccc4" : "#fff",
            }}
          >
            {seqNumbers(nx).map((xi) => {
              return (
                <div
                  className="flex-c"
                  style={{
                    width: npx(cellW),
                    height: npx(cellH),
                    border: "0.5px solid #8884",
                    color: "#8884",
                    fontSize: npx(12),
                  }}
                >
                  {xi % 4 === 0 && yi % 2 === 1 && "・"}
                </div>
              );
            })}
          </div>
        );
      })}
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
          {seqNumbers(4).map(() => (
            <div style={{ flexGrow: 1, border: "solid 0.5px #ccc" }} />
          ))}
        </div>
        <div
          className="flex-h"
          // style={{ flexGrow: 1 }}
          style={{
            flexGrow: 1,
            border: "solid 0.5px #ccc",
            borderBottom: "none",
          }}
        >
          {seqNumbers(4).map(() => (
            <div style={{ flexGrow: 1, border: "solid 0.5px #ccc" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BackgroundGridLayer = () => {
  const cellW = 16;
  const cellH = 12;
  const nx = 32;
  return (
    <div className="flex-v">
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
      <PianoRollBackgroundOctaveBlock cellW={cellW} cellH={cellH} nx={nx} />
    </div>
  );
};

export const PianoRollEditorView = () => {
  const refBaseDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const baseDiv = refBaseDiv.current!;
    baseDiv.scrollTop = baseDiv.scrollHeight / 2 - baseDiv.clientHeight / 2;
  }, []);
  return (
    <div className="w-[580px] h-[300px] flex-c border border-cyan-600 bg-cyan-100/20">
      <div className="flex-v">
        piano-roll
        <div
          ref={refBaseDiv}
          style={{ height: "180px", overflowX: "hidden", overflowY: "scroll" }}
        >
          <BackgroundGridLayer />
        </div>
      </div>
    </div>
  );
};
