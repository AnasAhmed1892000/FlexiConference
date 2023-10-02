import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../values/Colors";
import { MarginsAndPaddings, BorderRadius } from "../values/dimensions";
import InputView from "./InputView";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import Login from "../screens/auth/login/LoginSlice";

/*
 */
const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;
const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Email Address is Required"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 char"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
const SignUpForm = () => {
  const navigation = useNavigation();
  const dispatch=useDispatch();
  const select = useSelector;
  const UserSignUp = async (
    name,
    email,
    password,
    passwordConfirm,
   
  ) => {
    var data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      
    });
    console.log(data);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://flexi-conference.onrender.com/api/v1/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    try {
      const response = await axios(config);
      
      if (response.data.status == "success") {
        
        dispatch(Login.setCurrentUser(true));
        console.log(response.data);
        await AsyncStorage.setItem("token", response.data.token);
        console.log(response.data.token)
       
      }
    } catch (error) {
      console.log(error.message);

     
      dispatch(Login.setCurrentUser(false));
      if (error.message.includes("400")) {
        // Display an error message to the user using an alert or a toast message
        alert("This email address already exists");
      } else {
        alert("Something went wrong please try agian later ");
      }
    }
  };
  return (
    <View>
      <Formik
        validationSchema={SignupValidationSchema}
        initialValues={initialValues}
        onSubmit={
          (values) =>
           UserSignUp(
              values.name,
              values.email,
              values.password,
              values.passwordConfirm
            )
          // **place for api request**
        }
      >
        {(props) => {
          return (
            <View style={styles.form}>
              <InputView
                {...props}
                name="name"
                placeholder={"Enter Your Full Name"}
                title=""
                handelChange={props.handleChange}
                handleBlur={props.handleBlur}
              />
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
              <InputView
                {...props}
                name="passwordConfirm"
                placeholder={"Confirm Your Password"}
                title=""
                handelChange={props.handleChange}
                handleBlur={props.handleBlur}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginRight: W * 0.15,
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    lineHeight: 20,
                  }}
                >
                  by sigining up you'ar agree to our{" "}
                </Text>
                <Text
                  style={{
                    color: Colors.blue,
                    textAlign: "left",
                    lineHeight: 20,
                  }}
                >
                  Terms& Condtions{" "}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    lineHeight: 20,
                  }}
                >
                  and{" "}
                </Text>
                <Text
                  style={{
                    color: Colors.blue,
                    lineHeight: 20,
                    textAlign: "left",
                  }}
                >
                  Privacy Policy{" "}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: W * 0.23,
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    width: W * 0.85,
                    height: H * 0.065,
                    backgroundColor: Colors.buttonBlue,
                    marginTop: MarginsAndPaddings.xl,

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
                      Sign Up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 50,
                  marginRight: W * 0.23,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 15, opacity: 0.8 }}>
                  Already have account ?
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 5,
                  }}
                  onPress={() => navigation.navigate("login")}
                >
                  <Text style={{ color: Colors.blue, fontSize: 15 }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: W * 0.07,
  },
});
