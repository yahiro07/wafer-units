import { h, render } from "preact";
import "./page.css";
import { setup } from "goober";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { App } from "@/root/app";

setup(h);

const root = document.getElementById("app")!;
render(<App />, root);
onIframeUnitUnloading(() => render(null, root));
