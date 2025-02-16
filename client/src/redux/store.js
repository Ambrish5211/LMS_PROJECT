import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlice.js';
import courseReducer from './slices/courseSlice.js';
import lectureReducer from './slices/lectureSlice.js';
import razorpayReducer from './slices/paymentSlice.js';


const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        razorpay: razorpayReducer,
        lecture: lectureReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true
});

export default store;