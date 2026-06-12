import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { createRoot } from "react-dom/client";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { App } from "./app";
import cssText from "./page.css?inline";

export default createCustomElementClass(
  (shadowRoot) => {
    const root = createRoot(shadowRoot);
    root.render(<App />);
    return () => {
      root.unmount();
    };
  },
  [cssText, cssText2],
);
