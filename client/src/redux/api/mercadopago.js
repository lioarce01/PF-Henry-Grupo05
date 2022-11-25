import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || "http://localhost:3001";

export const mercadoPagoApi = createApi({
  reducerPath: "mercadoPagoApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: [],

  endpoints: (builder) => ({
    checkoutPlan: builder.mutation({
        query: ({accessToken, shelter, donation, id, email}) => ({
            url: "/mp/plan",
            method: "post",
            body: {shelter, donation, shelterId, goalId, email},
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }),
    }),

    verifyPaymentPlan: builder.query({
      query: ({payment_id}) => `/feedback/plan?payment_id=${payment_id}`
    })
  }),
});

export const {
   useCheckoutPlanMutation,
   useLazyVerifyPaymentPlanQuery
} = mercadoPagoApi;
