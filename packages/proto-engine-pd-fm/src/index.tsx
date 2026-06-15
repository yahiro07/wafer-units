import { render } from "solid-js/web";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { App } from "./app";
import cssText from "./styles/page.css?inline";
import cssText2 from "./styles/utility-classes.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Oxanium:wght@400..700&display=swap";

export default createCustomElementClass((root) => render(() => <App />, root), {
  cssTexts: [cssText, cssText2],
  stylesheetUrls: [webFontUrl],
});
