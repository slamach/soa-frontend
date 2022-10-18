import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BasicResponse,
  Location,
  LocationGroups,
  Page,
  Pageable,
  Route,
  RouteAddDTO,
  RouteFilterDTO,
  RouteUpdateDTO,
} from '../../types/api';
import { baseRoutesQuery } from './baseQuery';

const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: baseRoutesQuery,
  tagTypes: ['Routes'],
  endpoints: (builder) => ({
    getRoutes: builder.query<Page<Route>, RouteFilterDTO & Pageable>({
      query: (params) => ({
        url: '/',
        method: 'GET',
        params,
      }),
      providesTags: ['Routes'],
    }),
    addRoute: builder.mutation<Route, RouteAddDTO>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Routes'],
    }),
    updateRoute: builder.mutation<Route, RouteUpdateDTO>({
      query: (body) => ({
        url: '/',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Routes'],
    }),
    deleteRoute: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routes'],
    }),
    getObjectWithMinimumName: builder.query<
      BasicResponse<Route | Location>,
      void
    >({
      query: () => ({
        url: '/minimum-name',
        method: 'POST',
      }),
    }),
    getToGroups: builder.query<LocationGroups, void>({
      query: () => ({
        url: '/groups',
        method: 'POST',
      }),
    }),
    getSumOfDistances: builder.query<BasicResponse<number>, void>({
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
