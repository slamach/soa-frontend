import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import routesApi from './api/routes';

const store = configureStore({
  reducer: { [routesApi.reducerPath]: routesApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routesApi.middleware),
});

setupListeners(store.dispatch);

export default store;
