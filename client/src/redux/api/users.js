import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || 'http://localhost:3001';

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: ["Users", "UserId"],

    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (userName) => `/users?name=${userName}`,
            providesTags: ["Users"]
        }),

        getUserById: builder.query({
            query: (userId) => `/users/${userId}`,
            providesTags: ["UserId"]
        }),

        getUserFollowing: builder.query({
            query: (userId) => `/users/${userId}/following`,
        }),

        createUser: builder.mutation({
            query: (newUser) => {
                return {
                    url: "/users/",
                    method: "post",
                    body: newUser
                }},
            invalidatesTags: ["UserId"]
        }),

        updateUser: builder.mutation({
            query: (newUser) => {
                return {
                    url: "/users/",
                    method: "put",
                    body: newUser
                }},
            invalidatesTags: ["UserId"]
        }),

        deleteUser: builder.mutation({
            query: (userId) => {
                return {
                    url: `/users/${userId}`,
                    method: "delete",
                }},
            invalidatesTags: ["UserId"]
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useGetUserFollowingQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApi;