import { setupDrivers } from "@/drivers";
import { MainView } from "@/sections/main-view";

export function App() {
  setupDrivers();
  return <MainView />;
}
