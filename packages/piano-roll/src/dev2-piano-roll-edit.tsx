import { seqNumbers } from "mofur/ax";
import { npx } from "mofur/ax-ui";

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
  return (
    <div className="flex-v">
      <PianoRollBackgroundOctaveBlock cellW={16} cellH={12} nx={32} />
      <PianoRollBackgroundOctaveBlock cellW={16} cellH={12} nx={32} />
      <PianoRollBackgroundOctaveBlock cellW={16} cellH={12} nx={32} />
    </div>
  );
};

export const PianoRollEditorView = () => {
  return (
    <div style={{ height: "180px", overflowX: "hidden", overflowY: "scroll" }}>
      <BackgroundGridLayer />
    </div>
  );
};
