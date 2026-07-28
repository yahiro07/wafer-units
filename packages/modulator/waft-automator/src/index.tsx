import { createCssRealm } from "mini-css";
import { render } from "preact";

const { css, sheet, styled } = createCssRealm();

function flexH(gap?: number) {
  return {
    display: "flex",
    alignItems: "center",
    gap: gap ? `${gap}px` : undefined,
  };
}
function flexC(gap?: number) {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: gap ? `${gap}px` : undefined,
  };
}

const Knob = styled.div({
  background: "#ddd",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
});

const PanelBody = styled.div({
  background: "#48f",
  width: "700px",
  height: "400px",
});

render(
  <div>
    <div
      class={css(flexH(20), {
        padding: "4px",
        border: "1px solid green",
        "> span": { background: "blue", color: "white" },
      })}
    >
      <span>aaa</span>
      <span>bbb</span>
      <span>ccc</span>
    </div>
    <PanelBody>
      <div
        class={css(flexH(), {
          justifyContent: "space-around",
          height: "100%",
        })}
      >
        <Knob />
        <Knob />
        <Knob />
        <Knob />
      </div>
    </PanelBody>
  </div>,
  document.getElementById("app")!,
);

document.adoptedStyleSheets = [sheet];
