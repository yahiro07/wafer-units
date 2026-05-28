import { JSXElement } from "solid-js";

//this is an example component
export const Button = (props: {
  active?: boolean;
  text?: string;
  children?: JSXElement;
  onClick?: () => void;
  disabled?: boolean;
}): JSXElement => {
  return (
    <button type="button" onClick={props.onClick} disabled={props.disabled}>
      {props.text && <span>{props.text}</span>}
      {props.children}
    </button>
  );
};
