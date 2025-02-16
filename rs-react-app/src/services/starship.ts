import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../types/response';

export const starshipAPI = createApi({
  reducerPath: 'starshipAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (build) => ({
    fetchAllShips: build.query<IResponse, void>({
      query: () => '/starships',
    }),
  }),
});
