import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import cssText3 from "mofur-components/style.css?inline";
import { render } from "preact";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { App } from "@/app/app";
import cssText from "./page.css?inline";

const webFontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap";

export default createCustomElementClass(
  (shadowRoot) => {
    const emotionCache = createCache({
      key: "cs",
      container: shadowRoot,
    });
    render(
      <CacheProvider value={emotionCache}>
        <App />
      </CacheProvider>,
      shadowRoot,
    );
    return () => {
      render(null, shadowRoot);
    };
  },
  { cssTexts: [cssText, cssText2, cssText3], stylesheetUrls: [webFontUrl] },
);
