import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import AppStack from "./appStack";
import AuthStack from "./authStack";
import Login, { selectCurrentUser } from "../screens/auth/login/LoginSlice";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
/*
 */
const NavigationHandler = () => {

  const dispatch = useDispatch();
  const select = useSelector;
  const currentUserCheck = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      
      try {
        dispatch(Login.setCurrentUser(true));
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    } else {
      dispatch(Login.setCurrentUser(false));
    }
  };
  const currentUser = select(selectCurrentUser);
  console.log(currentUser);
  const renderSwitch = useCallback(() => {
    LogBox.ignoreLogs(["new NativeEventEmitter"]);
    if (!currentUser) {
      return <AuthStack />;
    }
    if (currentUser) {
      return <AppStack />;
    }
  }, [currentUser]);
  useEffect(() => {
    currentUserCheck();
    renderSwitch();
  }, []);
  return <NavigationContainer>{renderSwitch()}</NavigationContainer>;
};
export default NavigationHandler;
