import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { createRoot } from "react-dom/client";
import { createCustomElementSharableClass } from "wafer-host/unit-helper";
import { createApp } from "./app";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementSharableClass(
  (unitInterfaceProvider, shadowRoot) => {
    const unitInterface =
      unitInterfaceProvider.queryUnitInterface?.("wafer-v01");
    if (!unitInterface) {
      throw new Error("undefined unit interface");
    }
    const { App } = createApp(unitInterface);
    const root = createRoot(shadowRoot);
    root.render(<App />);
    return () => {
      root?.unmount();
    };
  },
  { cssTexts: [cssText, cssText2], stylesheetUrls: [webFontUrl] },
);
