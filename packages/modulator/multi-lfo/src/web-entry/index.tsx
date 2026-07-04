import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { App } from "@/root/app";

const rootElement = document.getElementById("app")!;

render(<App />, rootElement);

onIframeUnitUnloading(() => {
  render(null, rootElement);
});
