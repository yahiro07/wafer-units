import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm, cz } from "@/common/css-realm";
import { App } from "@/root/app";
import "virtual:uno.css";
import { appConfig } from "@/common/app-config";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class={cz("h-dvh flex-c", !appConfig.isDevelopment && "bg-clPageBg")}>
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
