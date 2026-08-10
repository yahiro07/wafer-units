import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm, qu } from "@/common/css-realm";
import { App } from "@/root/app";
import { pageBgColor } from "@/components/effector-body";

document.adoptedStyleSheets = [cssRealm.sheet];

const root = document.getElementById("app")!;

render(
  <div
    sx={[qu.wh("dvw", "dvh").bg(pageBgColor).flexVC(), qu.overflow("hidden")]}
  >
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
