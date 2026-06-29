import "mofur/ax-ui/utility-classes.css";
import { render } from "preact";
import "./page.css";
import { App } from "@/root/app";

render(
  <div className="w-dvw h-dvh flex-vc">
    <App />
  </div>,
  document.getElementById("app")!,
);
