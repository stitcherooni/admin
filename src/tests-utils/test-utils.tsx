import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as Mui } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import {
  AppStore, RootState, setupStore,
} from '../redux/store';
import { muiTheme } from '../App';
import { theme } from '../styles/defaultTheme';
import GlobalStyle from '../styles/globalStyles';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {} as PreloadedState<RootState>,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Mui theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Provider store={store}>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </Mui>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
