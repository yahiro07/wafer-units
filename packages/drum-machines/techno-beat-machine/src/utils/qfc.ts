import { ComponentChildren } from "preact";

export function qfc<TProps>() {
  return <TStyles>({
    render,
    styles,
  }: {
    render: (props: TProps, styles: TStyles) => ComponentChildren;
    styles: TStyles;
  }) => {
    return (props: TProps) => {
      return render(props, styles);
    };
  };
}
