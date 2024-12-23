import { createSlice } from '@reduxjs/toolkit';
// import data from '../data';

export const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    addBooks: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { addBooks } = bookSlice.actions;
export default bookSlice.reducer;
