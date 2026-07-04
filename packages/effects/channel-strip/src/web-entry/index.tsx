import { render } from "preact";
import "./page.css";
import { App } from "@/root/app";
import { qu } from "@/utils/qstyle-goober";

render(
  <div class={qu.css({ width: "100dvw", height: "100dvh" }).flexVC()}>
    <App />
  </div>,
  document.getElementById("app")!,
);
