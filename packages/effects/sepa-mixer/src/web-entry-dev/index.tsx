import "./page.css";
import { render } from "preact";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm, qu } from "@/common/css-realm";

const rootElement = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class={qu.css({ height: "100dvh" }).flexC().it}>wip</div>,
  rootElement,
);

onIframeUnitUnloading(() => {
  render(null, rootElement);
});
