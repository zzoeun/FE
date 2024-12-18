import { configureStore } from '@reduxjs/toolkit';
import bookSliceReducer from '../features/book/bookSlice';

export default configureStore({
  reducer: {
    books: bookSliceReducer,
  },
});
