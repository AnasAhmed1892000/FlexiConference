import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./combinedReducers";
import { useDispatch, useSelector } from "react-redux";
const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
export const useAppDispatch = () => useDispatch();
export const useAppSlector = useSelector;
export default store;
