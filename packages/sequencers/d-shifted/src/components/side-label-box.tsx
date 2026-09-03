import { ComponentChildren } from "preact";

export const SideLabelBox = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div class="flex-ha gap-2">
      <div class="text-sm">{label}</div>
      <div>{children}</div>
    </div>
  );
};
