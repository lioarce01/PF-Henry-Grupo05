import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || "http://localhost:3001";

export const goalsApi = createApi({
  reducerPath: "goalsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: ["Goals", "GoalId"],

  endpoints: (builder) => ({

    getGoals: builder.query({
      query: () => ({
        url: "/goals",
        method: "GET",
      }),
      providesTags: ["Goals"],
    }),

    createGoal: builder.mutation({
      query: (newGoal) => ({
          url: "/goals",
          method: "POST",
          body: newGoal,
        }),
      invalidatesTags: ["GoalId"],
    }),

    updateGoal: builder.mutation({
        query: ({ goal }) => ({
          url: "/goals",
          method: "put",
          body: { goal },
        }),
        invalidatesTags: ["Goals", "GoalId"],
      }),

    enableGoal: builder.mutation({
      query: ({ id }) => ({
          url: "/goals/enable",
          method: "PUT",
          body: { id },
        }),
        invalidatesTags: ["Goals", "GoalId"],
    }),

    disableGoal: builder.mutation({
      query: ({ id }) => ({
          url: "/goals/disable",
          method: "PUT",
          body: { id },
        }),
        invalidatesTags: ["Goals", "GoalId"],
    }),

    deleteGoal: builder.mutation({
      query: ({ id }) => ({
        url: "/goals/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Goals", "GoalId"],
    })

  }),
});

export const {
    useGetGoalsQuery,
    useUpdateGoalMutation,
    useEnableGoalMutation,
    useDisableGoalMutation,
    useCreateGoalMutation,
    useDeleteGoalMutation,
} = goalsApi;