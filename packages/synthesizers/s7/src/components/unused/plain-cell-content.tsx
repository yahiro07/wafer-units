import { qu } from "@/utils/qstyle-goober";

export const PlainCellContent = ({
  text,
  width,
}: {
  text: string;
  width: number;
}) => {
  return <div class={qu.flexC().w(width)}>{text}</div>;
};
