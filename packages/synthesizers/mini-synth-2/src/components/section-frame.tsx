import { css, cx } from "@twind/core";
import { ComponentChildren } from "preact";

export const SectionFrame = ({
  className,
  contentClassName,
  header,
  children,
}: {
  className?: string;
  contentClassName?: string;
  header: string;
  children: ComponentChildren;
}) => {
  return (
    <div class={cx(styles.base, className)}>
      <div class={styles.headerRow}>{header}</div>
      <div class={cx(styles.contentRow, contentClassName)}>{children}</div>
    </div>
  );
};
const styles = {
  base: css({
    "@apply": "flex-v rounded-[3px]",
    border: "solid 1px theme('colors.clSectionEdge')",
  }),
  headerRow: css({
    "@apply": "flex-ha px-4 pt-2.5 pb-1.5 text-clPrimary",
    borderBottom: "solid 1px theme('colors.clSectionEdge')",
  }),
  contentRow: css({
    "@apply": "flex-h justify-around pt-5 pb-3 px-2",
  }),
};
