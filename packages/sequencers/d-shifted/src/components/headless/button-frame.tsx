import { ComponentChildren } from "preact";

export const ButtonFrame = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ComponentChildren;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ cursor: "pointer" }}
    >
      {children}
    </button>
  );
};
