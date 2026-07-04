import "mofur/ax-ui/utility-classes.css";
import { render } from "preact";
import "./page.css";
import { App } from "@/root/app";
import { unitInterface } from "@/root/drivers";

const rootElement = document.getElementById("app")!;

render(
  <div className="w-dvw h-dvh bg-white flex-vc">
    <App />
  </div>,
  rootElement,
);

unitInterface?.onIframeUnloading(() => {
  render(null, rootElement);
});
