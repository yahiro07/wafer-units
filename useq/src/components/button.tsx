import { JSXElement } from "solid-js";

export const Button = (props: {
  active?: boolean;
  text?: string;
  children?: JSXElement;
  onClick?: () => void;
  disabled?: boolean;
}): JSXElement => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      class="min-w-[48px] h-[28px] flex-c border border-[#444]"
      style={{
        "background-color": props.active ? "#6c7" : "#ccc",
        color: props.active ? "#fff" : "#333",
        cursor: props.disabled ? "default" : "pointer",
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      {props.text && <span>{props.text}</span>}
      {props.children}
    </button>
  );
};
