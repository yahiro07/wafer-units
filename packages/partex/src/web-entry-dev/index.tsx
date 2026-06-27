import "mofur/ax-ui/utility-classes.css";
import { render } from "preact";
import "./page.css";
import { App } from "@/app/app";

render(
  <div className="w-dvw h-dvh bg-white flex-vc">
    <App />
  </div>,
  document.getElementById("app")!,
);
