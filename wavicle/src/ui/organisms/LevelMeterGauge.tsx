import { css, domStyled, FC, jsx } from "alumina";

type Props = {
  level: number;
};

export const LevelMeterGauge: FC<Props> = ({ level }) => {
  const levelPercent = Math.max(0, Math.min(1, level)) * 100;
  return domStyled(
    <div class="gauge">
      <div class="level" style={{ width: `${levelPercent}%` }} />
    </div>,
    css`
      width: 150px;
      height: 28px;
      background: #333;
      border-radius: 2px;
      overflow: hidden;

      .level {
        height: 100%;
        background: #0f0;
        transition: width 0.1s ease-out;
      }
    `,
  );
};
