// oxlint-disable no-unused-vars no-empty-pattern

import { css, domStyled, FC, jsx } from "alumina";

type Props = {};

const _ComponentTemplate: FC<Props> = ({}) => {
  return domStyled(<div></div>, css``);
};

const _ComponentTemplateNoProp: FC = () => {
  return domStyled(<div></div>, css``);
};
