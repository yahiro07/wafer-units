import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import cssText3 from "mofur-components/style.css?inline";
import { render } from "preact";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import cssText from "./page.css?inline";
import { createRtfrUnit } from "./unit";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

function createEntryClass() {
  const unitInterface = queryUnitInterfaceForModule(
    "wafer-v01",
    import.meta.url,
  );
  if (!unitInterface) {
    throw new Error("undefined unit interface");
  }
  const unit = createRtfrUnit(unitInterface);

  return createCustomElementClass(
    (shadowRoot) => {
      render(<unit.RenderUi />, shadowRoot);
      return () => {
        render(null, shadowRoot);
      };
    },
    { cssTexts: [cssText, cssText2, cssText3], stylesheetUrls: [webFontUrl] },
  );
}

export default createEntryClass();
