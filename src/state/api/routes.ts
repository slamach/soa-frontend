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
    addRoute: builder.mutation<
      components['schemas']['Route'],
      Omit<Omit<components['schemas']['Route'], 'id'>, 'creationDate'>
    >({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Routes'],
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
    getRouteWithMinimumName: builder.query<any, void>({
      query: () => ({
        url: '/minimum-name',
        method: 'POST',
      }),
    }),
    getToGroups: builder.query<any, void>({
      query: () => ({
        url: '/groups',
        method: 'POST',
      }),
    }),
    getSumOfDistances: builder.query<any, void>({
      query: () => ({
        url: '/all-distances',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useAddRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
  useLazyGetRouteWithMinimumNameQuery,
  useLazyGetToGroupsQuery,
  useLazyGetSumOfDistancesQuery,
} = routesApi;

export default routesApi;
