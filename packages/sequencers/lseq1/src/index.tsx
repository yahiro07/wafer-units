import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { createRoot } from "react-dom/client";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { App } from "./app";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementClass(
  (shadowRoot) => {
    const root = createRoot(shadowRoot);
    root.render(<App />);
    return () => {
      root.unmount();
    };
  },
  { cssTexts: [cssText, cssText2], stylesheetUrls: [webFontUrl] },
);
