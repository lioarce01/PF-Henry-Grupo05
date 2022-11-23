import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || "http://localhost:3001";

export const goalsApi = createApi({
  reducerPath: "goalsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: [],

  endpoints: (builder) => ({

    createGoal: builder.mutation({
        query: (newGoal ) => {
          console.log(newGoal)
          return({
          url: "/goals",
          method: "post",
          body: newGoal,
        })},
      }),

    updateGoal: builder.mutation({
        query: ({ goal }) => ({
          url: "/goals",
          method: "put",
          body: goal,
        }),
      }),

    changeStatusGoal: builder.mutation({
        query: (id) => ({
          url: "/goals/status",
          method: "put",
          body: id,
        }),
      }),

  }),
});

export const {
    useUpdateGoalMutation,
    useChangeStatusGoalMutation,
    useCreateGoalMutation
} = goalsApi;