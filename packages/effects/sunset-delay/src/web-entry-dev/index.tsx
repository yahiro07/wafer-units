import "./page.css";
import { render } from "preact";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm, qu } from "@/common/css-realm";
import { App } from "@/root/app";

const rootElement = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class={qu.h("dvh").flexC().it}>
    <App />
  </div>,
  rootElement,
);

onIframeUnitUnloading(() => {
  render(null, rootElement);
});
