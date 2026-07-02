import { render } from "preact";
import "./ui/page.css";
import "./ui/utility-classes.css";
import { App } from "@/root/app";

render(
  <div className="w-dvw h-dvh flex-vc">
    <App />
  </div>,
  document.getElementById("app")!,
);
