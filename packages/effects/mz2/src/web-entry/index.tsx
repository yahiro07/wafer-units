import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm } from "@/common/css-realm";
import { App } from "@/root/app";
import "virtual:uno.css";
import { appEnvs } from "@/common/app-envs";
import { cz } from "@/utils/cz";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class={cz("h-dvh flex-c", !appEnvs.isDevelopment && "cl-pageBg")}>
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
