import { createGlobalStyle } from 'styled-components';
import { theme } from './defaultTheme';

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
  background-color: ${theme.colors.main.background};
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

p, h1, h2, h3, h4, h5, h6, pre {
  margin: 0;
}
`;

export default GlobalStyle;
