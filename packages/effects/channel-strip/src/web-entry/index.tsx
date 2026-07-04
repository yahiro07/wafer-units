import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { App } from "@/root/app";

const root = document.getElementById("app")!;

render(<App />, root);

onIframeUnitUnloading(() => {
  render(null, root);
});
