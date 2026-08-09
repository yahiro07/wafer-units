import { render } from "preact";
import { css, tw, tx, tz } from "./twind-setup";

const App = () => {
  let active = true;
  return (
    <div class={tz("bg-clPanelBody h-[100dvh]")}>
      <div class={tx`text-red-500`}>hello</div>
      <div class={tw("text-blue-500")}>world</div>
      <div class={tw(css({ color: "green" }))}>world</div>
      <div
        class={tz(
          "p-2 inline-block px-4 font-bold",
          {
            color: "yellow",
            "&.--active": { background: "blue" },
            "& > .foo": { color: "pink" },
          },
          { transform: "rotate(30deg)" },
          { "@apply": "m-2", fontSize: "30px" },
          active && "--active",
        )}
      >
        world
        <div class="foo">foo</div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("app")!;
render(<App />, rootElement);
