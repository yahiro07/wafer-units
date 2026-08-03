import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm } from "@/base/css-realm";
import { App } from "@/root/app";

const rootElement = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(<App />, rootElement);

onIframeUnitUnloading(() => {
  render(null, rootElement);
});
