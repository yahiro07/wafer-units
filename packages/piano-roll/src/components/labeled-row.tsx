export const LabeledRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex-ha gap-2">
      <div className="">{label}</div>
      {children}
    </div>
  );
};
