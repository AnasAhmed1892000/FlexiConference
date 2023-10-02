import { combineReducers } from "@reduxjs/toolkit";
import Login from "../screens/auth/login/LoginSlice";

const RootReducer = combineReducers({
  login: Login.LoginSlice.reducer,
});
export default RootReducer;
