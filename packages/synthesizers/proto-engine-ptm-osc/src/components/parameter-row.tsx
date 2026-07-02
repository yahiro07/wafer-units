import { JSXElement } from "solid-js";

export function ParameterRow(props: { children: JSXElement; label: string }) {
  return (
    <div class="flex-ha gap-1">
      <div>{props.label}</div>
      <div>{props.children}</div>
    </div>
  );
}
