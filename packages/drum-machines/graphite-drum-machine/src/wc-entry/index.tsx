import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { render } from "preact";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { queryUnitInterfaceForModule } from "wafer-host/unit-types";
import { createApp } from "@/ui/app";
import cssText from "./page.css?inline";

const webFontUrls = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap",
];

//loading not works well so far
// export default createCustomElementSharableClass(
//   (unitInterfaceProvider, shadowRoot) => {
//     const unitInterface =
//       unitInterfaceProvider.queryUnitInterface?.("wafer-v01");
//     const App = createApp(unitInterface);
//     render(<App.Render />, shadowRoot);
//     return () => {
//       render(null, shadowRoot);
//     };
//   },
//   { cssTexts: [cssText, cssText2], stylesheetUrls: [webFontUrl] },
// );

const iconsUrl =
  "https://cdn.jsdelivr.net/npm/remixicon@4.9.1/fonts/remixicon.min.css";

//a workaround for the issue that the icons are not shown in web components
//insert icons css into both parent's document head and shadow root
webFontUrls.push(iconsUrl);

const unitInterface = queryUnitInterfaceForModule?.(
  "wafer-v01",
  import.meta.url,
);
const App = createApp(unitInterface);
export default createCustomElementClass(
  (shadowRoot) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = iconsUrl;
    shadowRoot.appendChild(link);

    render(<App.Render />, shadowRoot);
    return () => {
      render(null, shadowRoot);
    };
  },
  {
    cssTexts: [cssText, cssText2],
    stylesheetUrls: webFontUrls,
  },
);
