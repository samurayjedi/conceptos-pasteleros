import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import recipe from './recipe';

const store = configureStore({
  reducer: {
    recipe,
  },
  devTools: true,
});

export default store;

/** Types */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkGetters = { state: RootState };
