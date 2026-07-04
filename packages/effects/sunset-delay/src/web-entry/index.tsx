import "./page.css";
import { setup } from "goober";
import { h, render } from "preact";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { App } from "@/root/app";

setup(h);

const rootElement = document.getElementById("app")!;

render(<App />, rootElement);

onIframeUnitUnloading(() => {
  render(null, rootElement);
});
