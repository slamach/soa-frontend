import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './modules/main';

export default configureStore({
  reducer: { main: mainReducer },
});
