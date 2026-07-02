import { ReactNode } from "react";

export const ShifterFrame = ({
  children,
  onShift,
}: {
  children: ReactNode;
  onShift(dir: -1 | 1): void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) {
      onShift(-1);
    } else {
      onShift(1);
    }
  };
  return <div onClick={handleClick}>{children}</div>;
};
