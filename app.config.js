module.exports =  {
  expo: {
    name: "Pulse",
    slug: "pulse",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/Pulse-App.jpg",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/Pulse-App.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pulsetheparty.app",
      buildNumber: "6"
    },
    android: {
      package: "com.pulsetheparty.app",
      versionCode: 3,
      adaptiveIcon: {
        foregroundImage: "./assets/Pulse-App.jpg",
        backgroundColor: "black"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    updates: {
      url: "https://u.expo.dev/4b54f4df-4de2-47fb-ba68-48f1ec7209b1"
    },
    extra: {
      eas: {
        projectId: "4b54f4df-4de2-47fb-ba68-48f1ec7209b1"
      }
    },
    runtimeVersion: "1.0.0"
  }
}
