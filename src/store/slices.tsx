import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



interface CounterState {
   userInfo: object,
   ordesCount:object,
   Loading:boolean
 }
 
 const initialState: CounterState = {
   userInfo: {},
   ordesCount:{},
   Loading: true
 }

 export const mainSlices = createSlice({
   name:'MainStore',
   initialState,
   reducers:{
      setUser:(state,action:PayloadAction<any>)=>{
         state.userInfo = action.payload
      },
      setordesCount:(state,action:PayloadAction<any>)=>{
        state.ordesCount = action.payload
     },
     setLoading:(state,action)=>{
      state.Loading = action.payload
     }
   }
 })

 export const {setUser,setordesCount,setLoading} = mainSlices.actions

 export default mainSlices.reducer