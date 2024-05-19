import { createSlice } from '@reduxjs/toolkit';
import pages from './pages';

const initialState = {
  pages: pages,
  user: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newState = {
        ...state,
        user: action.payload
      }
      return newState;
    }
  }
});

// console.log(appSlice);
export const { setUser } = appSlice.actions;

export default appSlice.reducer;