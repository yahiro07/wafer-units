import { css, domStyled, FC, jsx } from "alumina";
import { LevelMeterGauge } from "@/ui/organisms/LevelMeterGauge";
import { CompactModeSwitcher } from "@/ui/panels/CompactModeSwitcher";
import { useUiThemeContext } from "./base";
import {
  InstrumentSelectionPartHorizontal_Buttons,
  InstrumentSelectionPartHorizontal_Selector,
  ParameterControlsPart,
  SystemMessagePanel,
  TitlesPartCore,
} from "./panels";

export const MainPanelCompact: FC = () => {
  const { colors } = useUiThemeContext();
  const fgColor = colors.clForeground;
  const panelColor = colors.clPanelBody;

  const edgeWidth = 3;

  return domStyled(
    <div>
      <div class="content">
        <div class="top-row">
          <TitlesPartCore />
          <CompactModeSwitcher />
        </div>
        <div class="main-row">
          <div class="selectors-part">
            <InstrumentSelectionPartHorizontal_Selector />
            <InstrumentSelectionPartHorizontal_Buttons class="shifter-buttons" />
          </div>
          <div class="controls-part-box">
            <ParameterControlsPart />
            <LevelMeterGauge level={0.8} />
          </div>
        </div>
        <div class="top-row"></div>
        <SystemMessagePanel />
      </div>
      <div class="cover" />
    </div>,
    css`
      position: relative;
      background: ${panelColor};
      border-radius: 2px;
      width: 400px;
      height: 225px;
      font-size: 16px;
      flex-shrink: 0;
      user-select: none;
      color: ${fgColor};
      display: flex;
      justify-content: center;
      align-items: center;

      > .content{
        margin-top: -20px;
        display: flex;
        flex-direction: column;

        > .top-row{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: -8px;
        }

        > .main-row{
          display: flex;
          gap: 30px;

          > .selectors-part {
            display: flex;
            flex-direction: column;
            gap: 10px;
            
          }

          > .controls-part-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        }
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
