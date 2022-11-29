import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || "http://localhost:3001";

export const mercadoPagoApi = createApi({
  reducerPath: "mercadoPagoApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: [],

  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: ({accessToken, shelter, donation, shelterId, goalId, email}) => ({
        url: "/mp",
        method: "post",
        body: {shelter, donation, shelterId, goalId, email},
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    }),

    verifyPayment: builder.query({
      query: ({payment_id}) => `mp/feedback?payment_id=${payment_id}`
    }),

    checkoutPlan: builder.mutation({
        query: ({accessToken, shelter, donation, id, email}) => ({
            url: "/mp/plan",
            method: "post",
            body: {shelter, donation, id, email},
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }),
    }),

    verifyPaymentPlan: builder.query({
      query: ({payment_id}) => `mp/feedback/plan?payment_id=${payment_id}`
    })
  }),
});

export const {
  useCheckoutMutation,
  useLazyVerifyPaymentQuery,
   useCheckoutPlanMutation,
   useLazyVerifyPaymentPlanQuery
} = mercadoPagoApi;
