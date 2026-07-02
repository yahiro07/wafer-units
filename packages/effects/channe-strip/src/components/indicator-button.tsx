import { qlsx, qu } from "@/utils/qstyle-goober";

export const IndicatorButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      class={qlsx(qu.flexC().wh(22, 16).rounded(1).bd("#555").cp())}
      style={{
        background: active ? "#0f0" : "#999",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};
