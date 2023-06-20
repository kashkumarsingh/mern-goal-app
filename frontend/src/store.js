import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import goalReducer from "./features/goal/goalSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
