import { render } from "preact";
import { createCustomElementClass } from "wafer-host/unit-helper";
import { cssRealm, qu } from "@/common/css-realm";
import { App } from "@/root/app";
import cssText from "./page.css?inline";
import { colors } from "@/editor/theme";

const webFontUrls = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap",
  "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
];

const iconsUrl =
  "https://cdn.jsdelivr.net/npm/remixicon@4.9.1/fonts/remixicon.min.css";

//a workaround for the issue that the icons are not shown in web components
//insert icons css into both parent's document head and shadow root
webFontUrls.push(iconsUrl);

export default createCustomElementClass(
  (shadowRoot) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = iconsUrl;
    shadowRoot.appendChild(link);

    render(
      <div sx={qu.bg(colors.panelBody).h("full").flexC()}>
        <App />
      </div>,
      shadowRoot,
    );
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
