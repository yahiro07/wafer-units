import { FunctionalComponent } from "preact";
import { ButtonFrame } from "@lib/mu2609/components/headless/button-frame";

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
