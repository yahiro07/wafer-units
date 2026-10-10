import { qu } from "@/common/css-realm";

export const IndicatorButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      sx={qu.flexC().wh(22, 16).rounded(1).bd("#555").cursor("pointer")}
      style={{
        background: active ? "#0f0" : "#999",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};
