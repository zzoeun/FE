import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    addBooks: (state, action) => {
      const newBooks = action.payload.filter(
        (newBook) => !state.some((existingBook) => existingBook.id === newBook.id)
      );
      state.push(...newBooks);
    },
  },
});

export const { addBooks } = bookSlice.actions;
export default bookSlice.reducer;
