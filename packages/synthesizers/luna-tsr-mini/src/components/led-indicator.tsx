import { cz } from "@/common/css-realm";

export const LedIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      class={cz(
        "w-5.5 h-5.5 cursor-pointer rounded-1px",
        !active && "bd-[#fff]/50 bg-[#aaa]/50",
        active && "bd-[#fff] bg-[#fff]/80",
      )}
      onClick={onClick}
    />
  );
};
