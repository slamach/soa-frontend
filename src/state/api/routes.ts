import { createApi } from '@reduxjs/toolkit/query/react';
import { components, operations } from '../../types/api/routes';
import { baseRoutesQuery } from './baseQuery';

const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: baseRoutesQuery,
  tagTypes: ['Routes'],
  endpoints: (builder) => ({
    getRoutes: builder.query<
      {
        totalElements: number;
        content: operations['getAll']['responses']['200']['content']['application/json'];
      },
      operations['getAll']['parameters']['query']['Routes filters'] &
        operations['getAll']['parameters']['query']['Paging and sorting']
    >({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
      providesTags: ['Routes'],
    }),
    addRoute: builder.mutation<
      | operations['create']['responses']['200']['content']['application/json']
      | operations['create']['responses']['400']['content']['application/json'],
      Omit<
        components['schemas']['Route'],
        'id' | 'creationDate' | 'from' | 'to'
      > & {
        from: Partial<components['schemas']['Location']>;
        to: Partial<components['schemas']['Location']>;
      }
    >({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Routes'],
    }),
    updateRoute: builder.mutation<
      | operations['update']['responses']['200']['content']['application/json']
      | operations['update']['responses']['400']['content']['application/json'],
      Partial<Omit<components['schemas']['Route'], 'from' | 'to'>> &
        Pick<components['schemas']['Route'], 'id'>
    >({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Routes'],
    }),
    deleteRoute: builder.mutation<
      | operations['delete']['responses']['200']
      | operations['delete']['responses']['404']['content']['application/json'],
      number
    >({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routes'],
    }),
    getObjectWithMinimumName: builder.query<
      | {
          payload: operations['getObjectWithMinimumName']['responses']['200']['content']['application/json'];
        }
      | operations['getObjectWithMinimumName']['responses']['404']['content']['application/json'],
      void
    >({
      query: () => ({
        url: '/minimum-name',
        method: 'POST',
      }),
    }),
    getToGroups: builder.query<
      {
        [group: string]: number;
      },
      void
    >({
      query: () => ({
        url: '/groups',
        method: 'POST',
      }),
    }),
    getSumOfDistances: builder.query<
      operations['computeDistances']['responses']['200']['content']['application/json'],
      void
    >({
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
  useLazyGetObjectWithMinimumNameQuery,
  useLazyGetToGroupsQuery,
  useLazyGetSumOfDistancesQuery,
} = routesApi;

export default routesApi;
