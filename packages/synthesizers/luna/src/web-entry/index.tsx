import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm } from "@/common/css-realm";
import { App } from "@/root/app";
import "virtual:uno.css";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class="h-dvh flex-c">
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
