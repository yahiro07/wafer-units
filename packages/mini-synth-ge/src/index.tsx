import "./styles/page.css";
import "./styles/utility-classes.css";

import { MainApp } from "@/MainApp";
import { mountAppRoot } from "@/utils/mount-app-root";

mountAppRoot(() => <MainApp />);
