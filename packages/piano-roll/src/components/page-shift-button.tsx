import { css } from "@emotion/react";
import { Icons } from "@/components/icons";

type Props = {
  direction: "left" | "right";
};

export const PageShiftButton = ({ direction }: Props) => {
  return (
    <div css={style}>
      {direction === "left" ? <Icons.ChevronLeft /> : <Icons.ChevronRight />}
    </div>
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
