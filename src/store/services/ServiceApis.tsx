
import { ApiService } from "./ApiServices";

export const ApiServices= ApiService.injectEndpoints({
   endpoints:(builder)=>({
    userlogin: builder.mutation({
      query:(body)=>({
        url:'franchises/login',
        method:'POST',
        body:body
      })
    }),
    getUserByid: builder.mutation({
      query:({})=>({
        url:'franchises/getUserById',
        method: 'GET',
      })
    }),
    getOrders: builder.mutation({
      query:(id)=>({
        url: `orders/ordersByQuery?deliveryAgentId=${id}`,
        method: 'GET',
      })
    }),
    updateOrder: builder.mutation({
      query:(payload)=>({
        url: `orders/updateOrder?orderId=${payload?.id}`,
        method:'POST',
        body:payload?.body
      })
    })
   })
})

export const { useUserloginMutation, useGetOrdersMutation,useGetUserByidMutation,useUpdateOrderMutation} = ApiServices