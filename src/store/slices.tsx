import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
   userInfo: object,
 }
 
 const initialState: CounterState = {
   userInfo: {}
 }

 export const mainSlices = createSlice({
   name:'MainStore',
   initialState,
   reducers:{
      setUser:(state,action:PayloadAction<any>)=>{
         state.userInfo = action.payload
      }
   }
 })

 export const {setUser} = mainSlices.actions

 export default mainSlices.reducer