import { ButtonFrame } from "@/components/headless/button-frame";
import { FunctionalComponent } from "preact";

type Props = {
  icon: FunctionalComponent<{ size?: number }>;
  size?: number;
  onClick: () => void;
};

export const IconButton = ({ icon: Icon, size, onClick }: Props) => {
  return (
    <ButtonFrame onClick={onClick} className="hover:opacity-80">
      <Icon size={size} />
    </ButtonFrame>
  );
};
