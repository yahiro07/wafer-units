import type { FC } from "alumina";
import { css, domStyled, jsx } from "alumina";
import { appStore } from "@/store";
import { LevelMeterGauge } from "@/ui/organisms/LevelMeterGauge";
import { CompactModeSwitcher } from "@/ui/panels/CompactModeSwitcher";
import { useUiThemeContext } from "./base";
import {
  InstrumentSelectionPart,
  KeysActiveAreaSlider,
  MainKeysPanel,
  OctaveShifterPart,
  ParameterControlsPart,
  SystemMessagePanel,
  TitlesPart,
} from "./panels";

export const MainPanel: FC = () => {
  const { colors } = useUiThemeContext();
  const { outputLevel01 } = appStore.uiPresenter.state;
  const fgColor = colors.clForeground;
  const panelColor = colors.clPanelBody;

  const edgeWidth = 3;

  return domStyled(
    <div>
      <div class="top-row">
        <InstrumentSelectionPart />
        <ParameterControlsPart />
        <div class="top-right-part">
          <CompactModeSwitcher />
        </div>
        <TitlesPart />
      </div>
      <div class="second-row">
        <div class="keys-box">
          <OctaveShifterPart />
          <KeysActiveAreaSlider />
        </div>
        <LevelMeterGauge level={outputLevel01} />
      </div>
      <div class="main-keys-row">
        <MainKeysPanel />
      </div>
      <SystemMessagePanel />
      <div class="cover" />
    </div>,
    css`
      position: relative;
      padding: 15px 15px 0;
      background: ${panelColor};
      border-radius: 2px;
      width: 800px;
      height: 450px;
      font-size: 16px;
      flex-shrink: 0;
      user-select: none;
      color: ${fgColor};

      display: flex;
      flex-direction: column;

      > div {
        /* border: solid 1px #888; */
      }

      > .top-row {
        position: relative;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 10px;
        padding-bottom: 5px;

        > .top-right-part {
          margin-left: 40px;
        }
        margin-bottom: auto;
      }

      > .second-row {
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;

        > .keys-box {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        > .midi-in-part {
          margin-left: auto;
          margin-bottom: 1px;
        }
      }

      > .main-keys-row {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        margin-bottom: 3px;
      }

      > .cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        border-top: solid ${edgeWidth}px #fff3;
        border-left: solid ${edgeWidth}px #fff4;
        border-bottom: solid ${edgeWidth}px #0003;
        border-right: solid ${edgeWidth}px #0004;
      }
    `,
  );
};
