import { qu } from "@/utils/qulex-goober";

export const PlainCellContent = ({
  text,
  width,
}: {
  text: string;
  width: number;
}) => {
  return <div class={qu.flexC().w(width).it}>{text}</div>;
};
