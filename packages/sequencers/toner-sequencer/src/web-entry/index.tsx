import { render } from "preact";
import "./page.css";
import { qu } from "@/common/css-realm";
import { App } from "@/root/app";

render(
  <div class={qu.css({ width: "100dvw", height: "100dvh" }).flexVC().it}>
    <App />
  </div>,
  document.getElementById("app")!,
);
