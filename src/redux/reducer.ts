import authSlice from "./slice/authSlice";

import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import { eventApi } from "./api/event.api";



export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  authSlice: authSlice.reducer,
})