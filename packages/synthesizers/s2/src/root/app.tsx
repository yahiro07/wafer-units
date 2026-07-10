import { useEffect } from "preact/hooks";
import {
  setupMidiInputForDebug,
  setupSynchronization,
  setupUnit,
} from "@/root/drivers";
import { PageRoot } from "@/root/page-root";

setupUnit();

export const App = () => {
  useEffect(setupSynchronization, []);
  useEffect(setupMidiInputForDebug, []);
  return <PageRoot />;
};
