import cssText2 from "mofus/ax-ui/utility-classes.css?inline";
import { render } from "solid-js/web";
import { createCustomElementClass } from "wus-unit-types/unit-helper";
import { App } from "./app";
import cssText from "./page.css?inline";

export default createCustomElementClass(
  (root) => render(() => <App />, root),
  [cssText, cssText2],
);
