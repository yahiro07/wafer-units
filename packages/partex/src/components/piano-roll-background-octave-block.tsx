import { css } from "@emotion/react";
import clsx from "clsx";
import { seqNumbers } from "mofur/ax";
import { npx } from "mofur/ax-ui";
import { useMemo } from "react";

export const PianoRollBackgroundOctaveBlock = ({
  cellW,
  cellH,
  nx,
}: {
  cellW: number;
  cellH: number;
  nx: number;
}) => {
  const rootCss = useMemo(
    () => makeCssPianoRollBackgroundOctaveBlock(cellW, cellH),
    [cellW, cellH],
  );
  return (
    <div className="relative" css={rootCss}>
      {seqNumbers(7).map((yi) => {
        const isTonic = yi === 6;
        const isDominant = yi === 2;
        return (
          <div
            className={clsx(
              "grid-row",
              isTonic && "--tonic",
              isDominant && "--dominant",
            )}
          >
            {seqNumbers(nx).map((xi) => {
              return (
                <div className="grid-cell">
                  {/* <div>{xi % 4 === 0 && yi === 6 && "・"}</div> */}
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="overlay-h">
        <div className="overlay-h-bar">
          {seqNumbers(2).map(() => (
            <div className="overlay-h-split" />
          ))}
        </div>
      </div>
    </div>
  );
};

function makeCssPianoRollBackgroundOctaveBlock(cellW: number, cellH: number) {
  return css`
    & > .grid-row {
      display: flex;
      background: #fff;

      &.--tonic {
        background: #fd94;
      }
      &.--dominant {
        background: #fd92;
      }
    }

    & > .grid-row > .grid-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${npx(cellW)};
      height: ${npx(cellH)};
      border: 0.5px solid #8881;
      color: #8884;
      font-size: ${npx(12)};
    }

    & > .overlay-v,
    & > .overlay-h {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    & > .overlay-v {
      display: flex;
      flex-direction: column;
    }

    & > .overlay-v > .overlay-v-top {
      height: 57.14%;
      border-bottom: 1px solid #ccc;
    }

    & > .overlay-h {
      display: flex;
    }

    & > .overlay-h > .overlay-h-bar {
      display: flex;
      flex-grow: 1;
      border: solid 0.5px #ccc;
      border-right: none;
      border-bottom: none;
    }

    & > .overlay-h > .overlay-h-bar > .overlay-h-split {
      flex-grow: 1;
      border: solid 0.5px #ccc4;
    }
  `;
}
