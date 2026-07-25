import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm, qu } from "@/common/css-realm";
import { App } from "@/root/app";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class={qu.h("dvh").flexC().it}>
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
