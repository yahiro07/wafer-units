const IconImpl = ({
  className,
  spec,
  size,
}: {
  className?: string;
  spec: string;
  size?: number;
}) => {
  return (
    <i
      class={className ? [spec, className].join(" ") : spec}
      style={size ? { fontSize: `${size}px` } : undefined}
    />
  );
};

type IconProps = {
  className?: string;
  size?: number;
};
function iconHoc(spec: string) {
  return (props: IconProps) => <IconImpl spec={spec} {...props} />;
}

export const Icons = {
  Exchange: iconHoc("ri-arrow-left-right-line"),
};
