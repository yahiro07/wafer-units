import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { render } from "preact";
import { createCustomElementSharableClass } from "wafer-host/unit-helper";
import { createApp } from "@/root/app";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementSharableClass(
  (unitInterfaceProvider, shadowRoot) => {
    const unitInterface =
      unitInterfaceProvider.queryUnitInterface?.("wafer-v01");
    const App = createApp(unitInterface);
    render(<App.Render />, shadowRoot);
    return () => {
      render(null, shadowRoot);
    };
  },
  { cssTexts: [cssText, cssText2], stylesheetUrls: [webFontUrl] },
);
