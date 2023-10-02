import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import NavigationHandler from "./src/navigation/indexx";
export default function App() {
 
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <NavigationHandler />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
