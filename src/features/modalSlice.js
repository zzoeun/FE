import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    openModal: (state) => (state = true),
    closeModal: (state) => (state = false),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
