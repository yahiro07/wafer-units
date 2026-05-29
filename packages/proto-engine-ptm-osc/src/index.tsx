import "./page.css";
import "beams/ax-ui/utility-classes.css";
import { mountAppRoot } from "beams/ax-solid/mount-app-root";
import { setupDrivers } from "@/drivers";
import { MainView } from "@/sections/main-view";

function App() {
  setupDrivers();
  return <MainView />;
}

mountAppRoot(() => <App />);
