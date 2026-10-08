import "./page.css";
import "virtual:uno.css";
import { render } from "solid-js/web";
import { App } from "@/app";
import { onIframeUnitUnloading } from "wafer-host/unit-types";

const appDiv = document.getElementById("app")!;
const cleanup = render(() => <App />, appDiv);

onIframeUnitUnloading(cleanup);
