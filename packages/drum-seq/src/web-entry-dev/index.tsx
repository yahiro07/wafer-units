import "mofur/ax-ui/utility-classes.css";
import { render } from "preact";
import { App } from "../root/app";
import "./page.css";

render(
  <div className="w-dvw h-dvh flex-c">
    <App />
  </div>,
  document.getElementById("app")!,
);
