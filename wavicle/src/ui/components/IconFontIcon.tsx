import { FC, jsx, css } from 'alumina';

interface Props {
  spec: string;
  size?: number;
}

const style = (size?: number) => css`
  font-size: ${size ? `${size}px` : 'inherit'};
`;

export const IconFontIcon: FC<Props> = ({ spec, size }) => {
  if (spec.startsWith('ri-') || spec.startsWith('ph-')) {
    return <i class={[spec, style(size)]} />;
  }
  if (spec.startsWith('fa-')) {
    const modSize = size && (size * 0.85) >> 0;
    return <i class={[spec, style(modSize)]} />;
  }
  if (spec.startsWith('ti-')) {
    return <i class={['ti', spec, style(size)]} />;
  }
  if (spec.startsWith('bi-')) {
    const modSize = size && (size * 0.9) >> 0;
    return <i class={['bi', spec, style(modSize)]} />;
  }
  if (spec.startsWith('mi ')) {
    const text = spec.replace('mi ', '');
    return <i class={['material-icons', style(size)]}>{text}</i>;
  }
  if (spec.startsWith('mso ')) {
    const text = spec.replace('mso ', '');
    return (
      <span class={['material-symbols-outlined', style(size)]}>{text}</span>
    );
  }
  return <div>invalid iconSpec: {spec}</div>;
};
