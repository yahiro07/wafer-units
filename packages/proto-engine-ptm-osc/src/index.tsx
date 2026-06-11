import cssText2 from "mofus/ax-ui/utility-classes.css?inline";
import { render } from "solid-js/web";
import { App } from "./app";
import cssText from "./page.css?inline";

export default class UnitElement extends HTMLElement {
  isMounted: boolean;
  disposeRender: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isMounted = false;
  }

  connectedCallback() {
    if (this.isMounted || !this.shadowRoot) return;

    const style = document.createElement("style");
    style.dataset.unit1Styles = "true";
    style.textContent = cssText + cssText2;
    this.shadowRoot.appendChild(style);

    this.disposeRender = render(() => <App />, this.shadowRoot);
    this.isMounted = true;
  }

  disconnectedCallback() {
    if (this.isMounted && this.shadowRoot) {
      setTimeout(() => {
        if (!this.shadowRoot) return;
        this.disposeRender?.();
        this.disposeRender = null;
        this.isMounted = false;
      }, 0);
    }
  }
}
