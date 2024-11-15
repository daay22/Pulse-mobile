import React, { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import { fetchUpdateAsync, reloadAsync } from "expo-updates";
import { Image, View } from "react-native";
import { ProgressBar } from "react-native-paper";

function AppAutoUpdateScreen({ navigation }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 1) {
        setProgress((prevProgress) => prevProgress + 0.1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const checkAppUpdates = async () => {
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        getUpdates();
      } else {
        navigation.replace("Scanner");
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    checkAppUpdates();
  }, []);

  const getUpdates = async () => {
    try {
      await fetchUpdateAsync();
      await reloadAsync();
    } catch (e) {
      await reloadAsync();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          borderRadius: 30,
        }}
      >
        <Image
          source={require('../../assets/Pulse-App.jpg')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{ position: "absolute", bottom: "10%", alignSelf: "center" }}
      >
        <ProgressBar
          progress={progress}
          color={"#ac07c5"} // You can change the color as needed
          style={{
            width: 317,
            height: 10,
            borderRadius: 10,
            borderColor: "black",
          }}
        />
      </View>
    </View>
  );
}

export default AppAutoUpdateScreen;
