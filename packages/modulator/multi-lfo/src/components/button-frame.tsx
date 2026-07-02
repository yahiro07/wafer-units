import { Children } from "@/base/jsx-types";

export const ButtonFrame = ({
  children,
  onClick,
}: {
  children: Children;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      {children}
    </div>
  );
};
