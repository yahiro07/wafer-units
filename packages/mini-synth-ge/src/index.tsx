import { render } from "solid-js/web";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { MainApp } from "@/MainApp";
import cssText from "./styles/page.css?inline";
import cssText2 from "./styles/utility-classes.css?inline";

const webFontUrls = [
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@400..700&display=swap",
];

export default createCustomElementClass(
  (root) => render(() => <MainApp />, root),
  {
    cssTexts: [cssText, cssText2],
    stylesheetUrls: webFontUrls,
  },
);
