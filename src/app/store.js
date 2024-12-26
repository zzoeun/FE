import { configureStore } from '@reduxjs/toolkit';
import dropdownSliceReducer from '../features/dropdownSlice';
import modalSliceReducer from '../features/modalSlice';

export default configureStore({
  reducer: {
    dropdown: dropdownSliceReducer,
    modal: modalSliceReducer,
  },
});
