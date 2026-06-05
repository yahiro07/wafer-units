import "./page.css";
import "mofus/ax-ui/utility-classes.css";
import { mountAppRoot } from "mofus/ax-solid";
import { setupDrivers } from "@/drivers";
import { MainView } from "@/sections/main-view";

function App() {
  setupDrivers();
  return <MainView />;
}

mountAppRoot(() => <App />);
