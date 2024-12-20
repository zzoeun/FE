import { configureStore } from '@reduxjs/toolkit';
import bookSliceReducer from '../features/book/bookSlice';
import modalSliceReducer from '../features/book/modalSlice';
import dropdownSliceReducer from '../features/book/dropdownSlice';

export default configureStore({
  reducer: {
    books: bookSliceReducer,
    modal: modalSliceReducer,
    dropdown: dropdownSliceReducer,
  },
});
