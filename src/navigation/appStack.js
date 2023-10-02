import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/app/HomeScreen";
import VideoCallScreen from "../screens/app/VideoCallScreen";
const stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="videoCall"
        component={VideoCallScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
