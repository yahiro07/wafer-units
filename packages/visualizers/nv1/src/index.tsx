import "./page.css";
import "virtual:uno.css";
import { render } from "solid-js/web";
import { App } from "@/app";

const appDiv = document.getElementById("app")!;
render(() => <App />, appDiv);
