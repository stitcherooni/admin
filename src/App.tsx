import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as Mui } from '@mui/material/styles';
import { theme } from './styles/defaultTheme';
import GlobalStyle from './styles/globalStyles';
import { router } from './router/router';

export const muiTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${theme.colors.main.red}`,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors.gray.gray1,
          },
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.colors.main.white} inset`,
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <Mui theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Mui>
  );
}
