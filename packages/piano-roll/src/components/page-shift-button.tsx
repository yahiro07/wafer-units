import { css } from "@emotion/react";
import { Icons } from "@/components/icons";

type Props = {
  direction: "left" | "right";
  onClick?: () => void;
};

export const PageShiftButton = ({ direction, onClick }: Props) => {
  return (
    <button css={style} onClick={onClick}>
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
});
