import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const BASE_ROUTES_URL =
  process.env.REACT_APP_ROUTES_BASE_URL || 'https://localhost:30000';
const BASE_NAVIGATOR_URL =
  process.env.REACT_APP_NAVIGATOR_BASE_URL || 'https://localhost:30001';

export const baseRoutesQuery = fetchBaseQuery({
  baseUrl: BASE_ROUTES_URL + '/routes',
});

export const baseNavigatorQuery = fetchBaseQuery({
  baseUrl: BASE_NAVIGATOR_URL + '/navigator',
});
