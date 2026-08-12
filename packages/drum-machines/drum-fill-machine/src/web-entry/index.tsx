import "./page.css";
import { render } from "preact";
import "@/common/setup-twind";
import { App } from "@/root/app";

const rootElement = document.getElementById("app")!;
render(<App />, rootElement);
