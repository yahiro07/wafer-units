import { render } from "preact";
import "./app.css";
import "@/utils/setup-twind";
import { App } from "@/root/app";

render(<App />, document.getElementById("app")!);
