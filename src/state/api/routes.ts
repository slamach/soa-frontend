import { createApi } from '@reduxjs/toolkit/query/react';
import { components } from '../../types/routesApi';
import { baseRoutesQuery } from './baseQuery';

const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: baseRoutesQuery,
  tagTypes: ['Routes'],
  endpoints: (builder) => ({
    getRoutes: builder.query<
      {
        totalElements: number;
        content: components['schemas']['Route'][];
      },
      components['schemas']['RoutesFilterDto'] &
        components['schemas']['Pageable']
    >({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
      providesTags: ['Routes'],
    }),
    updateRoute: builder.mutation<
      components['schemas']['Route'],
      Partial<components['schemas']['Route']> &
        Pick<components['schemas']['Route'], 'id'>
    >({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Routes'],
    }),
    deleteRoute: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routes'],
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = routesApi;

export default routesApi;
