import { render } from "preact";
import "@/root/setup-twind";
import "./page.css";
import { App } from "@/root/app";

render(<App />, document.getElementById("app")!);
