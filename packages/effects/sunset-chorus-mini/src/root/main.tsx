import { render } from "preact";
import "./page.css";
import "./utility-classes.css";
import { useEffect } from "preact/hooks";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { PageRoot } from "@/editor/page-root";
import { setupSynchronization, setupUnit } from "@/root/drivers";

setupUnit();

const App = () => {
  useEffect(setupSynchronization, []);
  return <PageRoot />;
};

const root = document.getElementById("app")!;
render(<App />, root);

onIframeUnitUnloading(() => {
  render(null, root);
});
