import { createApi } from '@reduxjs/toolkit/query/react';
import { components } from '../../types/routesApi';
import { baseRoutesQuery } from './baseQuery';

const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: baseRoutesQuery,
  endpoints: (builder) => ({
    getRoutes: builder.query<
      components['schemas']['Route'][],
      components['schemas']['RoutesFilterDto'] &
        components['schemas']['Pageable']
    >({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useGetRoutesQuery } = routesApi;

export default routesApi;
