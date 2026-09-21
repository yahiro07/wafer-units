import { render } from "preact";
import "./page.css";
import "./utility-classes.css";
import { useEffect } from "preact/hooks";
import { onIframeUnitUnloading } from "wafer-host/unit-types";
import { PageRoot } from "@/editor/page-root";
import { store } from "@/editor/store";
import { setupSynchronization, setupUnit } from "@/root/drivers";

setupUnit();

const App = () => {
  const { viewActive } = store.useSnapshot();
  useEffect(setupSynchronization, []);
  if (!viewActive) return null;
  return <PageRoot />;
};

const root = document.getElementById("app")!;
render(<App />, root);

onIframeUnitUnloading(() => {
  render(null, root);
});
