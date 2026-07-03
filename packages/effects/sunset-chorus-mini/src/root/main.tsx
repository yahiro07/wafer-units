import { render } from "preact";
import "../common/page.css";
import "../common/utility-classes.css";
import { useEffect } from "preact/hooks";
import { PageRoot } from "@/editor/page-root";
import { setupSynchronization, setupUnit } from "@/root/drivers";

setupUnit();

const App = () => {
  useEffect(setupSynchronization, []);
  return <PageRoot />;
};

render(
  <div className="w-dvw h-dvh flex-vc">
    <App />
  </div>,
  document.getElementById("app")!,
);
