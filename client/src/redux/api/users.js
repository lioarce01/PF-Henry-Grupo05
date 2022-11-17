import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || 'http://localhost:3001';

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: ["Users", "UserId"],

    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (user) => `/users?name=${user}`,
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
            query: ( newUser ) => {
                return {
                    url: "/users/",
                    method: "post",
                    body: newUser,
                }},
            invalidatesTags: ["UserId"]
        }),

        updateUser: builder.mutation({
            query: ({ accessToken, userId, updatedUser }) => {
                return {
                    url: `/users/${userId}`,
                    method: "put",
                    body: updatedUser,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }},
            invalidatesTags: ["UserId"]
        }),

        deleteUser: builder.mutation({
            query: ({ accessToken, userId }) => {
                return {
                    url: `/users/${userId}`,
                    method: "delete",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }},
            invalidatesTags: ["UserId"]
        }),

        disableUser: builder.mutation({
            query: ({ accessToken, userId }) => {
                return {
                    url: `/users/disable`,
                    method: "put",
                    body: { userId },
                }
            },
            invalidatesTags: ["UserId", "Users"]
        }),

        enableUser: builder.mutation({
            query: ({ accessToken, userId }) => {
                return {
                    url: `/users/enable`,
                    method: "put",
                    body: { userId },
                }
            },
            invalidatesTags: ["UserId", "Users"]
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useGetUserFollowingQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useSetFollowMutation,
    useDisableUserMutation,
    useEnableUserMutation,
} = usersApi;
