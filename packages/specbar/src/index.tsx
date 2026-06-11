import cssText2 from "mofur/ax-ui/utility-classes.css?inline";
import { createRoot, Root } from "react-dom/client";
import { App } from "./app";
import cssText from "./page.css?inline";

export default class UnitElement extends HTMLElement {
  isMounted: boolean = false;
  root: Root | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  mountApp() {}

  connectedCallback() {
    if (this.isMounted || !this.shadowRoot) return;

    const style = document.createElement("style");
    style.dataset.unit1Styles = "true";
    style.textContent = cssText + cssText2;
    this.shadowRoot.appendChild(style);

    this.root = createRoot(this.shadowRoot);
    this.root.render(<App />);
    this.isMounted = true;
  }

  disconnectedCallback() {
    if (this.isMounted && this.shadowRoot) {
      setTimeout(() => {
        if (!this.shadowRoot) return;
        this.root?.unmount();
        this.root = null;
        this.isMounted = false;
      }, 0);
    }
  }
}
