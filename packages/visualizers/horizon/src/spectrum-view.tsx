import { mapUnaryFrom, seqNumbers } from "@lib/mu2609/utils/helpers";
import styles from "./spectrum-view.module.css";

function readFftData(fftData: Float32Array | null, xpos: number) {
  if (!fftData) return 0;
  const index = Math.round(xpos * (fftData.length - 1));
  return mapUnaryFrom(fftData[index], -180, 0, true);
}

function _readFftDataDummy(_fftData: Float32Array | null, xpos: number) {
  const levels = [
    0.7, 0.8, 0.6, 0.6, 0.5, 0.6, 0.55, 0.6, 0.55, 0.6, 0.5, 0.45, 0.4, 0.25,
    0.15, 0.05,
  ];
  return levels[Math.round(xpos * (levels.length - 1))];
}

export const SpectrumView = (props: { fftData: Float32Array | null }) => {
  return (
    <div class={styles.spectrumView}>
      {seqNumbers(16).map((i) => {
        let xpos = (i === 0 ? 0.5 : i) / 15;
        const level = readFftData(props.fftData, xpos);
        return (
          <div>
            {seqNumbers(18).map((j) => {
              const ypos = j / 17;
              const active = ypos < level;
              return <div class={active ? styles.active : undefined} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
