import { createSlice } from '@reduxjs/toolkit';
import data from '../data';

export const bookSlice = createSlice({
  name: 'books',
  initialState: data,
});

export default bookSlice.reducer;
