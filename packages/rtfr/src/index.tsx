import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import cssText3 from "mofur-components/style.css?inline";
import { render } from "preact";
import { createCustomElementSharableClass } from "wafer-host/unit-helper";
import cssText from "./page.css?inline";
import { createRtfrUnit } from "./unit";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementSharableClass(
  (unitInterfaceProvider, shadowRoot) => {
    const unitInterface =
      unitInterfaceProvider.queryUnitInterface?.("wafer-v01");
    if (!unitInterface) {
      throw new Error("undefined unit interface");
    }
    const unit = createRtfrUnit(unitInterface);
    render(<unit.RenderUi />, shadowRoot);
    return () => {
      render(null, shadowRoot);
    };
  },
  { cssTexts: [cssText, cssText2, cssText3], stylesheetUrls: [webFontUrl] },
);
