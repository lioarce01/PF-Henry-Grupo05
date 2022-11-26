import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || 'http://localhost:3001';

export const ticketsApi = createApi({
    reducerPath: "ticketsApi",
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: ["tickets", "ticketsId", "ticketsShelter"],

    endpoints: (builder) => ({

        getTickets: builder.query({
            query: () => `/tickets`,
            providesTags: ["tickets"]
        }),

        getTicketsByShelter: builder.query({
            query: (shelterId) => `/tickets/shelter/${shelterId}`,
            providesTags: ["ticketsShelter"]
        }),

        respondTicket: builder.mutation({
            query: (body) => ({
                url: "/tickets/respond",
                method: "post",
                body
            }),
            invalidatesTags: ["tickets", "ticketsId", "ticketsShelter"]
        }),

        addNewTicket: builder.mutation({
            query: (body) => ({
                url: `/tickets`,
                method: "post",
                body,
            }),
            invalidatesTags: ["tickets", "ticketsId", "ticketsShelter"]
        }),



    })
})

export const {
    useGetTicketsQuery,
    useRespondTicketMutation,
    useGetTicketsByShelterQuery,
    useLazyGetTicketsByShelterQuery,
    useAddNewTicketMutation

} = ticketsApi;