import { configureStore } from "@reduxjs/toolkit";
import { ApiService } from "./services/ApiServices";
import  mainSlices  from "./slices";

const store= configureStore({
   reducer:{
      reusableStore:mainSlices,
      [ApiService.reducerPath]:ApiService.reducer
   },
   middleware:(getDefaultMiddleware)=> 
      getDefaultMiddleware().concat(
         ApiService.middleware
      )
   ,
})

// export type RootState =ReturnType<typeof store.getState>

export default store