import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse, Result } from '../types/response';

export const starshipAPI = createApi({
  reducerPath: 'starshipAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    fetchShipDetails: build.query<Result, string | string[] | undefined>({
      query: (ship) => `starships/${ship}`,
    }),
    fetchShipsPage: build.query<IResponse, string | null>({
      query: (page) => `starships/?page=${page}`,
    }),
  }),
});
