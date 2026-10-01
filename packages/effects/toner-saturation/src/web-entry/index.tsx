import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm } from "@/common/css-realm";
import "virtual:uno.css";
import { appEnvs } from "@/common/app-envs";
import { cz } from "@lib/mu2609/utils/cz";
import { App } from "@/root/app";
import { tonerUiCssRealm } from "@lib/toner-ui-dark";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet, tonerUiCssRealm.sheet];

render(
  <div class={cz("h-dvh flex-c", !appEnvs.isDevelopment && "bg-clPanelBg")}>
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
