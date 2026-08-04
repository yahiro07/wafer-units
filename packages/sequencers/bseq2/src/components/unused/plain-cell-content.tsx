import { qu } from "@/common/css-realm";

export const PlainCellContent = ({
  text,
  width,
}: {
  text: string;
  width: number;
}) => {
  return <div sx={qu.flexC().w(width)}>{text}</div>;
};
