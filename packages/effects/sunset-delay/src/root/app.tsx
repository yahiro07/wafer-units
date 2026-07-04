import { useEffect } from "preact/hooks";
import { setupStoreSynchronization, setupUnit } from "@/root/drivers";
import { PageRoot } from "@/root/page-root";

setupUnit();

export const App = () => {
  useEffect(setupStoreSynchronization, []);
  return <PageRoot />;
};
