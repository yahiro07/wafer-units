import { render } from "solid-js/web";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { App } from "./app";
import cssText from "./styles/page.css?inline";
import cssText2 from "./styles/utility-classes.css?inline";

export default createCustomElementClass(
  (root) => render(() => <App />, root),
  [cssText, cssText2],
);
