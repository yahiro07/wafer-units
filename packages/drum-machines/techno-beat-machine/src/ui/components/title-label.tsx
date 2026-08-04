import { qu } from "@/ui/common/css-realm";

export const TitleLabel = ({ text }: { text: string }) => {
  return <div sx={qu.color("#ddd").fontSize(22).weight("500")}>{text}</div>;
};
