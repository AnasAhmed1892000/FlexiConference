import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import AgoraUIKit from "agora-rn-uikit";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MarginsAndPaddings } from "../../values/dimensions";
import createAgoraRtcEngine from "react-native-agora";
import { useRoute } from "@react-navigation/native";
const VideoCallScreen = () => {
  const route = useRoute();
  const channelId = route.params?.channelId;
  //const { create, channelId } = route.params;
  const navigation = useNavigation();
  const [videoCall, setVideoCall] = useState(true);
  const createEngine = async () => {
    const agoraRtcEngine = await createAgoraRtcEngine.create({
      appId: "6fc8db8c19874a7ba6b3120bb81771b8",
    });

    await agoraRtcEngine.login(
      "6fc8db8c19874a7ba6b3120bb81771b8",
      "007eJxTYLgy+X9OlQL/18P+6xh/75Bjrj76WF+6nWvSm2bNryUJRyYrMJilJVukJFkkG1pamJskmiclmiUZGxoZJCVZGJqbGyZZdNVJpjYEMjJUb3jEwAiFID4LQ0lqcQkDAwCPayBR"
    );
  };
  //createEngine();
  connectionData = {
    appId: "6fc8db8c19874a7ba6b3120bb81771b8",
    channel: channelId ? channelId : "test",
    token:
      "007eJxTYAhjP2CiF/xO/d/7SxyVsVNZfK6bchnODCuXlFt5bTG/YYsCg1laskVKkkWyoaWFuUmieVKiWZKxoZFBUpKFobm5YZLF5gDp1IZARoaiYwcZGKEQxGdhKEktLmFgAACPLB0g",
  };
  callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return (
    <View>
      {videoCall ? (
        <SafeAreaView
          style={{
            // paddingHorizontal: MarginsAndPaddings.ml,
            height: "100%",
          }}
        >
          <AgoraUIKit
            connectionData={connectionData}
            rtcCallbacks={callbacks}
          />
        </SafeAreaView>
      ) : (
        navigation.navigate("home") // Corrected this line
      )}
    </View>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({});
