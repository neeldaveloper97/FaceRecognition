import {configureStore} from '@reduxjs/toolkit';
import testSlice from './slices/test.slice';

export const appStore = configureStore({
  reducer: {
    test: testSlice,
    // More slices here...!
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
