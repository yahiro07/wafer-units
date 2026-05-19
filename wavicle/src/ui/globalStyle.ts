import { css } from 'alumina';

export const cssGlobalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html,
  body,
  #app {
    height: 100%;
  }
  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-size: 16px;
    font-weight: normal;
  }

  ul,
  li {
    list-style: none;
  }
`;
