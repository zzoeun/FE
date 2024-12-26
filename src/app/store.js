import { configureStore } from '@reduxjs/toolkit';
import dropdownSliceReducer from '../features/dropdownSlice';

export default configureStore({
  reducer: {
    dropdown: dropdownSliceReducer,
  },
});
