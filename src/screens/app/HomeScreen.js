import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../values/Colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import InputView from "../../components/InputView";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AgoraUIKit from "agora-rn-uikit";
import { useDispatch , useSelector } from "react-redux";
import Login from "../auth/login/LoginSlice";
import { useNavigation } from "@react-navigation/native";
/*
 */
const H = Dimensions.get("window").height;
const W = Dimensions.get("window").width;
const createCall = async () => {
  //const agouraEngine = await
  const engine = await createAgoraRtcEngine.create({
    appId: "6fc8db8c19874a7ba6b3120bb81771b8",
  });
  const channelId = await engine.generateChannelId();
  await engine.joinChannel(channelId);
  return channelId;
};
const HomeScreen = () => {
  const navigation = useNavigation();
  const [channelId, setChannelId] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [create, setCreate] = useState(null);
  const dispatch = useDispatch();
  const select =useSelector;
  const joinChannel = async () => {
    setCreate(false);
    navigation.navigate("videoCall", { create, channelId });
  };

  const handleInput = (event) => {
    setChannelId(event.target.value);
    setDisabled(event.target.value === "");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <KeyboardAvoidingView behavior="padding" />
        <View style={styles.subContainer1}>
          <Image
            source={require("../../../assets/homeIcon.png")}
            resizeMode="contain"
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: MarginsAndPaddings.ml,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                width: W * 0.85,
                height: H * 0.065,
                backgroundColor: Colors.buttonBlue,
                marginTop: MarginsAndPaddings.xl,
                marginVertical: MarginsAndPaddings.ml,
                marginLeft: -28,
                borderRadius: BorderRadius.s,
              }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("videoCall")}
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
                  Create Conference
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: MarginsAndPaddings.ml,
            }}
          >
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
              onPress={() => joinChannel()}
              disabled={disabled}
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
                  Join Existing Conference
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
            }}
          >
            <Input
              style={styles.textInputStyle}
              type="text"
              placeholder="Channel ID"
              onChange={handleInput}
            />
          </View>
         
        </View>
        <View style={{
            position : "absolute",
            top :H*0.85,
            right :W * 0.85,
            zIndex : 999

          }}>
            <TouchableOpacity onPress={async()=>{
               dispatch(Login.setCurrentUser(false));
               
               const key = "token";
               await AsyncStorage.removeItem(key);
            }}>
            <Icon name="logout" size={28} style={{
              opacity :0.7
            }}/>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgrounBlue,
    width: "100%",
    height: "100%",
    paddingTop: H * 0.055,
  },
  subContainer1: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -140,
  },
  textInputStyle: {
    borderRadius: 12,
    width: W * 0.85,
    height: H * 0.065,
    marginTop: H * 0.033,
    paddingLeft: W * 0.03,
    lineHeight: 24,
    backgroundColor: "#fff",
    borderColor: "#525252",
    fontSize: 12,
    textAlign: "left",
    borderBottomWidth: 0,
    borderBottomWidth: 0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 3,
    shadowColor: Colors.black,
    shadowOpacity: 0.15,
  },
});
