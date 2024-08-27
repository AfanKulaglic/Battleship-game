import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Importajte slice za korisnika

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Ova linija omogućava TypeScript-u da prepozna vrste Redux store-a
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
