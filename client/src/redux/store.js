import { configureStore } from "@reduxjs/toolkit";

import  authReducer from "./slices/authSlice";
import courseReducer from "./slices/courseSlice";
import razorpayReducer from "./slices/paymentSlice"

const store = configureStore({
  reducer:{
    auth: authReducer,
    course: courseReducer,
    razorpay: razorpayReducer
  },

  
  // Serializable data error fix code


  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true
})

export default store;
