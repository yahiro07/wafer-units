import { useEffect } from "preact/hooks";
import { setupSynchronization, setupUnit } from "@/root/drivers";
import { PageRoot } from "@/root/page-root";
import { store } from "@/root/store";

setupUnit();

export const App = () => {
  const { viewActive } = store.useSnapshot();
  useEffect(setupSynchronization, []);
  if (!viewActive) return null;
  return <PageRoot />;
};
