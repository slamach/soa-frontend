import { createApi } from '@reduxjs/toolkit/query/react';
import { operations } from '../../types/api/navigator';
import { baseNavigatorQuery } from './baseQuery';

const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: baseNavigatorQuery,
  endpoints: (builder) => ({
    getOrderedRoutes: builder.query<
      | operations['getOrderedRoutes']['responses']['200']['content']['application/json']
      | operations['getOrderedRoutes']['responses']['400']['content']['application/json'],
      operations['getOrderedRoutes']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: '/routes',
        method: 'POST',
        body,
      }),
    }),
    getRouteByLength: builder.query<
      | operations['getRouteByLength']['responses']['200']['content']['application/json']
      | operations['getRouteByLength']['responses']['400']['content']['application/json']
      | operations['getRouteByLength']['responses']['404']['content']['application/json'],
      operations['getRouteByLength']['requestBody']['content']['application/json']
    >({
      query: (body) => ({
        url: '/route',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLazyGetOrderedRoutesQuery } = routesApi;

export default routesApi;
