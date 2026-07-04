import { useEffect } from "preact/hooks";
import { setupSynchronization, setupUnit } from "@/root/drivers";
import { PageRoot } from "@/root/page-root";

setupUnit();

export const App = () => {
  useEffect(setupSynchronization, []);
  return <PageRoot />;
};
