import { css } from "@emotion/react";
import { Icons } from "@/components/icons";

type Props = {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
};

export const PageShiftButton = ({ direction, onClick, disabled }: Props) => {
  return (
    <button css={style} onClick={onClick} disabled={disabled}>
      {direction === "left" ? <Icons.ChevronLeft /> : <Icons.ChevronRight />}
    </button>
  );
};
const style = css({
  width: "25px",
  height: "40px",
  background: "#4ce",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
  "&:disabled": {
    background: "#cccc",
    cursor: "default",
    pointerEvents: "none",
  },
});
