import "mofur/ax-ui/utility-classes.css";
import { render } from "preact";
import "./page.css";
import { App } from "@/app/app";
import { PageDev } from "@/app/page-dev";

render(
  <div className="w-dvw h-dvh flex-c">{1 ? <App /> : <PageDev />}</div>,
  document.getElementById("app")!,
);
