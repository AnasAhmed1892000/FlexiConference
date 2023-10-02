import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/login/LoginScreen";
import SignUpScreen from "../screens/auth/signUp/SignUpScreen";
const AuthStack = () => {
  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator>
      <stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
