import { createApi } from '@reduxjs/toolkit/query/react';
import { LengthFilterDTO, OrderedRoutesDTO, Route } from '../../types/api';
import { baseNavigatorQuery } from './baseQuery';

const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: baseNavigatorQuery,
  endpoints: (builder) => ({
    getOrderedRoutes: builder.query<Route[], OrderedRoutesDTO>({
      query: (body) => ({
        url: '/routes',
        method: 'POST',
        body,
      }),
    }),
    getRouteByLength: builder.query<Route, LengthFilterDTO>({
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
