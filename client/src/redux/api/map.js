import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "";

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: [],

  endpoints: (builder) => ({



    getCoords: builder.query({
      query: (url) => url,
    }),

    

    

    


  }),
});

export const {
    useGetCoordsQuery,
    useLazyGetCoordsQuery
} = mapApi;