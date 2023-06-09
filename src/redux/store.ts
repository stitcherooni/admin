// import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore, persistReducer, FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import signupReducer, { StateProps } from './signup.slice';

// export interface RootState {
//   signup: StateProps;
// }

// const persistConfig = {
//   key: 'pta-events',
//   storage,
// };

// const rootReducer = combineReducers({ signup: signupReducer });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

// export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//     preloadedState,
//   }),
// });

// export type AppStore = ReturnType<typeof setupStore>;
// export const persistor = persistStore(store);
