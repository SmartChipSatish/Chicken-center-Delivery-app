import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ApiService= createApi({
   reducerPath:'productsApi',
   baseQuery:fetchBaseQuery({
      baseUrl:'https://food-delivery-ekjr.onrender.com',
      prepareHeaders: async (headers: any) => {
         const token = await AsyncStorage.getItem('AccessToken');
         if (token) {
             headers.set('authorizationadmin', `${token}`)
         }
         return headers
     }
   }),
   endpoints:()=>({})
})