import {
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import SignUpForm from "../../../components/SignUpForm";
import Colors from "../../../values/Colors";
import { MarginsAndPaddings } from "../../../values/dimensions";
const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;
const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.image}>
          <Image
            source={require("../../../../assets/file_2023-09-27_22.49.50.png")}
            //resizeMode="cover"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <ScrollView style={{ marginBottom: H * 0.33 }}>
          <View style={styles.form}>
            <SignUpForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.backgrounBlue,
    paddingTop: H * 0.05,
  },
  image: {
    width: "100%",
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
    marginLeft: W * 0.07,
  },
});
