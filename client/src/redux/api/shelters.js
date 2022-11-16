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
            query: () => `/shelters/topFive`,
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
            query: ({ accessToken, updatedShelter, id }) => ({
                url: `/shelters/${id}`,
                method: "put",
                body: updatedShelter,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
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

        updateFollowers: builder.mutation({
            query: ({  userId, shelterId }) => {
                console.log("userId", userId);
                console.log("shelterId", shelterId);
                return ({
                url: `/shelters/follow`,
                method: "post",
                body: { userId, shelterId },
            })},
            invalidatesTags: ["Shelters"]
        })
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
    useUpdateFollowersMutation
} = sheltersApi;