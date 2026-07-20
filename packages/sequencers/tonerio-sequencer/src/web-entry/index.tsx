import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm, qu } from "@/common/css-realm";
import { App } from "@/root/app";

document.adoptedStyleSheets = [cssRealm.sheet];

const root = document.getElementById("app")!;

render(
  <div class={qu.css({ width: "100dvw", height: "100dvh" }).flexVC().it}>
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
