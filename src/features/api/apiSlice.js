import { createSlice, fetchBaseQuery } from '@reduxjs/toolkit';

export const apiSlice = createSlice({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    tagTypes: [],
    endPoints: (builder) => ({}),
  }),
});
