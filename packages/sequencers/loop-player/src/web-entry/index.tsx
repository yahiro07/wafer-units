import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { css, cssRealm } from "@/common/css-realm";
import { flexC } from "@/common/utility-styles";
import { App } from "@/root/app";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(
  <div class={css(flexC(), { height: "100dvh", background: "#fff" })}>
    <App />
  </div>,
  root,
);

onIframeUnitUnloading(() => {
  render(null, root);
});
