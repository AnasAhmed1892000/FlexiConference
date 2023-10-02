import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../../values/Colors";
import { SafeAreaView } from "react-native";
import LoginForm from "../../../components/LoginForm";
import { BorderRadius, MarginsAndPaddings } from "../../../values/dimensions";
const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;
const LoginScreen = () => {
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.image}>
          <Image source={require("../../../../assets/login.png")} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.form}>
          <LoginForm />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.backgrounBlue,
    paddingTop: H * 0.05,
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    opacity: 0.7,
  },
  titleContainer: {
    width: "100%",
    marginHorizontal: MarginsAndPaddings.ml,
    marginVertical: MarginsAndPaddings.l,
  },
  form: {
    marginHorizontal: MarginsAndPaddings.l,
  },
});
