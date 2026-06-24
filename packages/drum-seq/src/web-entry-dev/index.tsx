import "mofur/ax-ui/utility-classes.css";
import { render } from "preact";
import { createApp } from "../ui/app";
import "./page.css";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const App = createApp(unitInterface);
render(
  <div className="w-dvw h-dvh flex-c">
    <App.Render />
  </div>,
  document.getElementById("app")!,
);
