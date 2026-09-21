import { useDomElementSize } from "@/utils/use-dom-element-size";
import { ComponentChildren } from "preact";
import { useRef } from "preact/hooks";

export const ScalerBoxSC = ({
  scale,
  children,
}: {
  scale: number;
  children: ComponentChildren;
}) => {
  const innerDivRef = useRef<HTMLDivElement>(null);
  const contentSize = useDomElementSize(innerDivRef);
  return (
    <div
      style={{
        position: "relative",
        ...(contentSize
          ? {
              width: contentSize.width * scale,
              height: contentSize.height * scale,
            }
          : undefined),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div ref={innerDivRef}>{children}</div>
      </div>
    </div>
  );
};
