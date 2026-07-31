import { render } from "preact";
import "./page.css";
import { App } from "@/ui/app";
import { cssRealm } from "../ui/common/css-realm";

const root = document.getElementById("app")!;

document.adoptedStyleSheets = [cssRealm.sheet];

render(<App />, root);
