import cssText2 from "mofus/ax-ui/utility-classes.css?inline";
import { render } from "solid-js/web";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { App } from "./app";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementClass((root) => render(() => <App />, root), {
  cssTexts: [cssText, cssText2],
  stylesheetUrls: [webFontUrl],
});
