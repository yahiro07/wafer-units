import { render } from "preact";
import "./page.css";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { cssRealm } from "@/common/css-realm";
import { App } from "@/root/app";

document.adoptedStyleSheets = [cssRealm.sheet];

const root = document.getElementById("app")!;
render(<App />, root);
onIframeUnitUnloading(() => render(null, root));
