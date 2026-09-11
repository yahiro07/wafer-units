import { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

export const ScalerBoxSC = ({
  scale,
  children,
}: {
  scale: number;
  children: ComponentChildren;
}) => {
  type Size = { w: number; h: number };

  const innerDivRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState<Size | null>(null);

  useEffect(() => {
    const innerDiv = innerDivRef.current;
    if (innerDiv) {
      setContentSize({ w: innerDiv.scrollWidth, h: innerDiv.scrollHeight });
    }
  }, []);
  return (
    <div
      style={{
        ...(contentSize
          ? { width: contentSize.w * scale, height: contentSize.h * scale }
          : undefined),
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div ref={innerDivRef}>{children}</div>
      </div>
    </div>
  );
};
