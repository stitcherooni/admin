import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboard.slice';
import reportingReducer from './slices/reporting.slice';

const rootReducer = combineReducers({ dashboard: dashboardReducer, reporting: reportingReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
