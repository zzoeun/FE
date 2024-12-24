import { configureStore } from '@reduxjs/toolkit';
import bookSliceReducer from '../features/bookSlice';
import modalSliceReducer from '../features/modalSlice';
import dropdownSliceReducer from '../features/dropdownSlice';

export default configureStore({
  reducer: {
    books: bookSliceReducer,
    modal: modalSliceReducer,
    dropdown: dropdownSliceReducer,
  },
});
