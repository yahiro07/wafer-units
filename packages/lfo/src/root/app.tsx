import { setup } from "goober";
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { setupSynchronization, setupUnit } from "@/root/drivers";
import { PageRoot } from "@/root/page-root";

setup(h);
setupUnit();

export const App = () => {
  useEffect(setupSynchronization, []);
  return <PageRoot />;
};
