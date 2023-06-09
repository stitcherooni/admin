import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
}

#root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

p, h1, h2, h3, h4, h5, h6, pre {
  margin: 0;
}
`;

export default GlobalStyle;
