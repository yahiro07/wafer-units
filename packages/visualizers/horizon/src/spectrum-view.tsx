import { mapUnaryFrom, seqNumbers } from "@lib/mu2609/utils/helpers";
import styles from "./spectrum-view.module.css";

function readFftData(fftData: Float32Array, xpos: number) {
  const index = Math.round(xpos * fftData.length - 1);
  return mapUnaryFrom(fftData[index], -180, 0, true);
}

export const SpectrumView = (props: { fftData: Float32Array | null }) => {
  return (
    <div class={styles.spectrumView}>
      {seqNumbers(16).map((i) => {
        let xpos = (i === 0 ? 0.5 : i) / 15;
        const level = props.fftData ? readFftData(props.fftData, xpos) : 0;
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
