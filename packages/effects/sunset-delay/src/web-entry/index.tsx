import { render } from "preact";
import "./page.css";
import { App } from "@/root/app";
import { qu } from "@/utils/qulex-goober";

render(
  <div class={qu.css({ width: "100dvw", height: "100dvh" }).flexVC().it}>
    <App />
  </div>,
  document.getElementById("app")!,
);
