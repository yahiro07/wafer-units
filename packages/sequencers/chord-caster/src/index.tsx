import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { render } from "preact";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { createChordProgressionUnit } from "@/unit";
import cssText from "./page.css?inline";

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
  const unit = createChordProgressionUnit(unitInterface);

  return createCustomElementClass(
    (shadowRoot) => {
      render(<unit.RenderUi />, shadowRoot);
      return () => {
        render(null, shadowRoot);
      };
    },
    { cssTexts: [cssText, cssText2], stylesheetUrls: [webFontUrl] },
  );
}

export default createEntryClass();
