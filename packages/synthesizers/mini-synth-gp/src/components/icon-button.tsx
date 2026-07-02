import type { JSXElement } from "solid-js";

type IconButtonProps = {
  label: string;
  onClick: () => void;
  children: JSXElement;
};

export function IconButton(props: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={props.label}
      class="flex-c h-10 w-12 border border-zinc-700 bg-navy-950 text-gray-100 hover:bg-zinc-800 active:bg-zinc-700"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
