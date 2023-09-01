import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as Mui } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { theme } from './styles/defaultTheme';
import GlobalStyle from './styles/globalStyles';
import { router } from './router/router';
import { InitAuthComponent } from './utils/InitAuthComponent';

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

interface AppProps {
  instance: PublicClientApplication;
}

export default function App({ instance }: AppProps) {
  return (
    <MsalProvider instance={instance}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Mui theme={muiTheme}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <InitAuthComponent instance={instance} />
            <RouterProvider router={router} />
          </ThemeProvider>
        </Mui>
      </LocalizationProvider>
    </MsalProvider>
  );
}
