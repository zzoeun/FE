import { configureStore } from '@reduxjs/toolkit';
import bookSliceReducer from '../features/book/bookSlice';
import modalSliceReducer from '../features/book/modalSlice';

export default configureStore({
  reducer: {
    books: bookSliceReducer,
    modal: modalSliceReducer,
  },
});
