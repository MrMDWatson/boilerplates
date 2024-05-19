import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import hangmanReducer from '../features/hangman/hangmanSlice';
export const store = configureStore({
  reducer: {
    app: appReducer,
    hangman: hangmanReducer
  }
});
