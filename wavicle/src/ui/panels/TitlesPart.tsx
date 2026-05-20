import { css, domStyled, FC, jsx } from "alumina";
import { uiFontFamilySpecAppTitle } from "../base";
import { WaveLogo } from "../components";

export const TitlesPartCore: FC = () => {
  return domStyled(
    <div>
      <WaveLogo size={44} class="logo" />
      <h1>Wavicle</h1>
    </div>,
    css`
        display: flex;
        align-items: center;
        padding: 10px;
        gap: 1px;

        > .logo {
          margin-top: 10px;
        }

        > h1 {
          font-family: ${uiFontFamilySpecAppTitle};
          margin-top: 5px;
          font-size: 50px;
          line-height: 40px;
        }
    `,
  );
};

export const TitlesPart: FC = () => {
  return domStyled(
    <div>
      <TitlesPartCore />
    </div>,
    css`
      position: absolute;
      top: 0;
      left: 0;
    `,
  );
};
