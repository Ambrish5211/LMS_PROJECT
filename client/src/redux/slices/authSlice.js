import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || true,
  role: localStorage.getItem("role") || "ADMIN",
  data: localStorage.getItem("data") || {}
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
}); 

export default authSlice.reducer;