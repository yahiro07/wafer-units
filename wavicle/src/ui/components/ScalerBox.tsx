import {
  jsx,
  asyncRerender,
  css,
  useLocal,
  useRef,
  useEffect,
  AluminaNode,
  FC,
  domStyled,
} from 'alumina';

type Props = {
  contentWidth: number;
  contentHeight: number;
  children: AluminaNode;
};

export const ScalerBox: FC<Props> = ({
  contentWidth,
  contentHeight,
  children,
}) => {
  const local = useLocal({
    scale: 1.0,
    mh: 0,
    mv: 0,
  });

  const ref = useRef<HTMLDivElement>();
  const baseEl = ref.current;
  if (baseEl) {
    const { clientWidth: bw, clientHeight: bh } = baseEl;
    local.scale = Math.min(bw / contentWidth, bh / contentHeight);
    local.mh = Math.max((bw - contentWidth * local.scale) / 2, 0);
    local.mv = Math.max((bh - contentHeight * local.scale) / 2, 0);
  } else {
    asyncRerender();
  }

  useEffect(asyncRerender, [contentWidth, contentHeight]);

  return domStyled(
    <div ref={ref}>
      <div
        class={['inner', 'bg-plane']}
        style={{
          width: `${contentWidth * local.scale}px`,
          height: `${contentHeight * local.scale}px`,
          marginLeft: `${local.mh}px`,
          marginTop: `${local.mv}px`,
        }}
      />
      <div
        class="inner"
        style={{
          width: `${contentWidth}px`,
          height: `${contentHeight}px`,
          transform: `scale(${local.scale}, ${local.scale})`,
          marginLeft: `${local.mh}px`,
          marginTop: `${local.mv}px`,
        }}
      >
        {children}
      </div>
    </div>,
    css`
      width: 100%;
      height: 100%;
      position: relative;

      > .inner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto auto;
        transform-origin: left top;
      }
    `
  );
};
