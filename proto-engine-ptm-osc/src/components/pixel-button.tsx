import { JSXElement, splitProps } from "solid-js";

export function PixelButton(props: {
  text?: string;
  children?: JSXElement;
  active?: boolean;
  onClick?: () => void;
  class?: string;
  disabled?: boolean;
}) {
  const [local, others] = splitProps(props, [
    "text",
    "children",
    "active",
    "class",
  ]);

  return (
    <button
      type="button"
      {...others}
      class={`h-7 px-2 border text-[11px] tracking-[0.14em] leading-none flex-c cursor-pointer ${
        local.active
          ? "border-[#ffd861] bg-[#473405] text-[#ffd861]"
          : "border-[#63717f] bg-[#1b232d] text-[#c7d2de]"
      } ${local.class ?? ""}`}
    >
      {local.text && <span>{local.text}</span>}
      {local.children}
    </button>
  );
}
