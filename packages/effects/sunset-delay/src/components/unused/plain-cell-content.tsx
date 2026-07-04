import { qu } from "@/common/css-realm";

export const PlainCellContent = ({
  text,
  width,
}: {
  text: string;
  width: number;
}) => {
  return <div class={qu.flexC().w(width).it}>{text}</div>;
};
