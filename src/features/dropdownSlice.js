import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: '전체',
  reducers: {
    changeOption: (state, action) => (state = action.payload),
  },
});

export const { changeOption } = dropdownSlice.actions;
export default dropdownSlice.reducer;
