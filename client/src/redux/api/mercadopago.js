import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || "http://localhost:3001";

export const mercadoPagoApi = createApi({
  reducerPath: "mercadoPagoApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: [],

  endpoints: (builder) => ({
    checkout: builder.mutation({
        query: ({accessToken, shelter, donation, id, email}) => ({
            url: "/mp",
            method: "post",
            body: {shelter, donation, id, email},
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }),
    }),

    verifyPayment: builder.query({
      query: ({payment_id}) => `/mp/feedback?payment_id=${payment_id}`
    })
  }),
});

export const {
   useCheckoutMutation,
   useLazyVerifyPaymentQuery
} = mercadoPagoApi;
