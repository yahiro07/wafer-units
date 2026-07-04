import "mofur/ax-ui/utility-classes.css";
import { h, render } from "preact";
import "./page.css";
import { setup } from "goober";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { App } from "@/root/app";

setup(h);

const rootElement = document.getElementById("app")!;

render(<App />, rootElement);

onIframeUnitUnloading(() => {
  render(null, rootElement);
});
