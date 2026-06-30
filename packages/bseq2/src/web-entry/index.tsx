import { h, render } from "preact";
import "./page.css";
import { setup } from "goober";
import { App } from "@/root/app";

setup(h);

render(<App />, document.getElementById("app")!);
