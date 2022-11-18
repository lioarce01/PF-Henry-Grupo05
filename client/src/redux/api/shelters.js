import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || 'http://localhost:3001';

export const sheltersApi = createApi({
    reducerPath: "sheltersApi",
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: ["Shelters", "ShelterId"],

    endpoints: (builder) => ({
        getShelters: builder.query({
            query: (shelterName) => `/shelters?name=${shelterName}`,
            providesTags: ["Shelters"]
        }),

        getShelterById: builder.query({
            query: (shelterId) => `/shelters/${shelterId}`,
            providesTags: ["ShelterId"]
        }),

        topFiveShelters: builder.query({
            query: (cant = null) => `/shelters/topFive?cant=${cant}`,
            providesTags: ["Shelters"]
        }),

        sortShelters: builder.mutation({
            query: ({ order, orderType, group, groupType }) => ({
                url: "/shelters/filter-sort",
                method: "post",
                body: { order, orderType, group, groupType }
            }),
            invalidatesTags: ["Shelters"]
        }),

        addShelter: builder.mutation({
            query: ({ accessToken, newShelter }) => {
                return {
                    url: "/shelters/",
                    method: "post",
                    body: newShelter,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            },
            invalidatesTags: ["ShelterId"]
        }),

        updateShelter: builder.mutation({
            query: ({ updatedShelter, id }) => ({
                url: `/shelters/${id}`,
                method: "put",
                body: updatedShelter,
                // headers: {
                //     Authorization: `Bearer ${accessToken}`,
                // }
            }),
            invalidatesTags: ["ShelterId"]
        }),

        deleteShelter: builder.mutation({
            query: ({ accessToken, id }) => ({
                url: `/shelters/${id}`,
                method: "delete",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }),
            invalidatesTags: ["Shelters"]
        }),

        addFollowers: builder.mutation({
            query: ({ userId, shelterId }) => {
                console.log("user: ", userId);
                console.log("addfollow: ", shelterId);
                return ({
                url: `/shelters/follow`,
                method: "put",
                body: { userId, shelterId },
            })},
            invalidatesTags: ["Shelters", "ShelterId"]
        }),

        deleteFollowers: builder.mutation({
            query: ({ userId, shelterId }) => {
                console.log("user: ", userId);
                console.log("deleteFollow: ", shelterId);
                return ({
                url: `/shelters/unfollow`,
                method: "put", 
                body: { userId, shelterId },
            })},
            invalidatesTags: ["Shelters", "ShelterId"]
        }),
        disableShelter: builder.mutation({
            query: ({ shelterId }) => ({
                url: `/shelters/disable`,
                method: "put",
                body: { shelterId },
            }),
            invalidatesTags: ["Shelters", "ShelterId"]
        }),

        enableShelter: builder.mutation({
            query: ({ shelterId }) => ({
                url: `/shelters/enable`,
                method: "put",
                body: { shelterId },
            }),
            invalidatesTags: ["Shelters", "ShelterId"]
        }),
    })
})

export const {
    useGetSheltersQuery,
    useLazyGetSheltersQuery,
    useGetShelterByIdQuery,
    useLazyGetShelterByIdQuery,
    useTopFiveSheltersQuery,
    useSortSheltersMutation,
    useAddShelterMutation,
    useUpdateShelterMutation,
    useDeleteShelterMutation,
    useAddFollowersMutation,
    useDeleteFollowersMutation,
    useDisableShelterMutation,
    useEnableShelterMutation,
} = sheltersApi;