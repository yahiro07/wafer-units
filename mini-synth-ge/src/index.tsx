import "./page.css";
import "beams/ax-ui/utility-classes.css";

import { mountAppRoot } from "beams/ax-solid/mount-app-root";
import { MainApp } from "@/MainApp";

mountAppRoot(() => <MainApp />);
