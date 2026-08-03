import { qu } from "@/ui/common/css-realm";

export const TitleLabel = ({ text }: { text: string }) => {
  return (
    <div class={qu.color("#ddd").fontSize(22).weight("500").it}>{text}</div>
  );
};
