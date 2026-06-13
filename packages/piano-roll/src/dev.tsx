import customElementClass from "./index";

Object.assign(document.body.style, {
  height: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

customElements.define("app-element", customElementClass);
const el = document.createElement("app-element");
document.body.appendChild(el);
