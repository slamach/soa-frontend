import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import navigatorApi from './api/navigator';
import routesApi from './api/routes';

const store = configureStore({
  reducer: {
    [routesApi.reducerPath]: routesApi.reducer,
    [navigatorApi.reducerPath]: navigatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      routesApi.middleware,
      navigatorApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
