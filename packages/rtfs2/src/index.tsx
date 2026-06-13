import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import cssText3 from "mofur-components/style.css?inline";
import { render } from "preact";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { App } from "@/dev1-note-pitch-edit";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementClass(
  (shadowRoot) => {
    render(<App />, shadowRoot);
    return () => {
      render(null, shadowRoot);
    };
  },
  { cssTexts: [cssText, cssText2, cssText3], stylesheetUrls: [webFontUrl] },
);
