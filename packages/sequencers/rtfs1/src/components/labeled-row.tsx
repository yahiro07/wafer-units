import { ComponentChildren } from "preact";

export const LabeledRow = ({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) => {
  return (
    <div className="flex-ha gap-3">
      <div className="">{label}</div>
      {children}
    </div>
  );
};
