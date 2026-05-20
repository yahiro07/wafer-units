import { css, domStyled, FC, jsx } from "alumina";
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
        </div>
        <div class="main-row">
          <div class="selectors-part">
            <InstrumentSelectionPartHorizontal_Selector />
            <InstrumentSelectionPartHorizontal_Buttons class="shifter-buttons" />
          </div>
          <ParameterControlsPart />
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
      width: 420px;
      height: 230px;
      font-size: 16px;
      flex-shrink: 0;
      user-select: none;
      color: ${fgColor};
      display: flex;
      justify-content: center;
      align-items: center;

      > .content{
        margin-top: -12px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        > .top-row{
          display: flex;
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
