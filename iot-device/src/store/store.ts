import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "@/store/slices/authSlice";
import deviceReducer from "@/store/slices/deviceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    device: deviceReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
