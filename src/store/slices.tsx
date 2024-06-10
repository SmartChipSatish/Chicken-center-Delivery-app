import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



interface CounterState {
   userInfo: object,
   ordesCount:object,
 }
 
 const initialState: CounterState = {
   userInfo: {},
   ordesCount:{}
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
     }
   }
 })

 export const {setUser,setordesCount} = mainSlices.actions

 export default mainSlices.reducer