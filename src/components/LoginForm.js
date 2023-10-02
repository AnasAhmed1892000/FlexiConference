import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputView from "./InputView";
import { BorderRadius, MarginsAndPaddings } from "../values/dimensions";
import Colors from "../values/Colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/auth/login/LoginSlice";
import { useDispatch , useSelector } from "react-redux";
/*
 */
const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 char"),
});
const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const select =useSelector;
  const userSignIn = async (email, password) => {
   
    var data = {
      email: email,
      password: password,
    };
    var config = {
      method: "post",
      url: "https://flexi-conference.onrender.com/api/v1/users/login",
      data: data,
    };
    try {
      const response = await axios(config);
      await AsyncStorage.setItem("token", response.data.token);
    
      if (response.data.status == "success") {
        dispatch(Login.setCurrentUser(true));
       
      }
    } catch (error) {
      console.log(error.message);

      
      dispatch(Login.setCurrentUser(false));
      if (error.response && error.response.status === 401) {
        // Display an error message to the user using an alert or a toast message
        alert("Invalid email or password. Please try again.");
      } else {
        alert("Something went wrong please try agian later ");
      }
    }
  };
  return (
    <View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={(values) => userSignIn(values.email, values.password)}
      >
        {(props) => {
          return (
            <View
              style={{
                width: "100%",
                paddingHorizontal: W * 0.06,
              }}
            >
              <View style={styles.form}>
                <InputView
                  {...props}
                  name="email"
                  placeholder={"Enter Your Email"}
                  title=""
                  handelChange={props.handleChange}
                  handleBlur={props.handleBlur}
                />
                <InputView
                  {...props}
                  name="password"
                  placeholder={"Enter Your Password"}
                  title=""
                  handelChange={props.handleChange}
                  handleBlur={props.handleBlur}
                />
                <View
                  style={{
                    width: "100%",
                    marginBottom: MarginsAndPaddings.l,
                    marginRight: MarginsAndPaddings.m,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-end",
                      marginTop: 15,
                      marginRight: MarginsAndPaddings.xxl,
                      marginBottom: MarginsAndPaddings.l,
                    }}
                    onPress={null}
                  >
                    <Text
                      style={{
                        color: Colors.blue,
                      }}
                    >
                      Forgot Password ?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      width: W * 0.85,
                      height: H * 0.065,
                      backgroundColor: Colors.buttonBlue,
                      marginTop: MarginsAndPaddings.xl,
                      marginLeft: -28,
                      borderRadius: BorderRadius.s,
                    }}
                    activeOpacity={0.7}
                    onPress={() => props.handleSubmit()}
                    disabled={!props.dirty || !props.isValid}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        Log in
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 50,
                    marginRight: MarginsAndPaddings.xl,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, opacity: 0.8 }}>
                    Don't have account ?
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: 5,
                    }}
                    onPress={() => navigation.navigate("signup")}
                  >
                    <Text style={{ color: Colors.blue, fontSize: 15 }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: W * 0.07,
  },
});
