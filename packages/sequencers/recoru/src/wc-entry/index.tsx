import { render } from "preact";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { cssRealm } from "@/common/css-realm";
import { App } from "@/root/app";
import cssText from "./page.css?inline";

const webFontUrls = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap",
  "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
];

export default createCustomElementClass(
  (shadowRoot) => {
    render(<App />, shadowRoot);
    return () => {
      render(null, shadowRoot);
    };
  },
  {
    cssTexts: [cssText],
    stylesheetUrls: webFontUrls,
    adoptedStyleSheets: [cssRealm.sheet],
  },
);
