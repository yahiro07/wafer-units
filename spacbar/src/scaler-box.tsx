import { npx } from "@beam/ax-ui/styling-utils";
import { ReactNode } from "react";

export function ScalerBox(props: {
  children: ReactNode;
  contentWidth: number;
  contentHeight: number;
  scale: number;
}) {
  return (
    <div
      style={{
        width: npx(props.contentWidth * props.scale),
        height: npx(props.contentHeight * props.scale),
      }}
    >
      <div
        style={{
          transform: `scale(${props.scale})`,
          transformOrigin: "left top",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
