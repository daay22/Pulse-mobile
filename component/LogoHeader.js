import {Image} from "react-native"





function LogoTitle() {
    return (
      <Image
        style={{ width: "100%", height: 50 }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    );
  }

  export default LogoTitle;