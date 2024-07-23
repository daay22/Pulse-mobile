// App.js

import React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BarcodeScannerScreen  from './BarcodeScanner.js';
import ProfileScreen from "./views/ProfileScreen"
import BathroomSelectionScreen from "./views/InClubScreens/BathroomSelectionScreen.js"
import ClubDetails from "./views/ClubSelectionScreens/ClubDetails.js"
import ClubMain from "./views/ClubSelectionScreens/ClubMain.js"
import BarSelection from './views/DrinkSelectionScreens/BarSelection.js'
import DrinkMenu from './views/DrinkSelectionScreens/DrinkMenu.js'
import DrinkSelection from './views/DrinkSelectionScreens/DrinkSelection.js' 
import BathroomList from "./views/InClubScreens/BathroomList.js"
import Checkout from './views/DrinkSelectionScreens/Checkout.js'
import RecieptDetails from "./views/RecieptDetails.js"
import { MyProvider, MyContext } from './store/context';
import { StripeProvider } from '@stripe/stripe-react-native';
import { SafeAreaView, StyleSheet } from 'react-native';





const Stack = createStackNavigator();

export default function App() {

  return (
  <SafeAreaView style={styles.container}>
    <StripeProvider
      publishableKey="pk_live_51LlDznHYav5iWqq6ZVD09p48uNXUDufce0own5zDqO7Rm6JR0n2mVMhaisviumfPz05Y1VzSgLplhLjRHUFGFlSC00JODuDu7L"
      //urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      //merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
    <MyProvider>
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Scanner"  options= {{headerShown:false}} component={BarcodeScannerScreen} />
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#4F47C7',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} headerStyle name="Profile Creation" component={ProfileScreen}/>
        <Stack.Screen name="Bathroom Selection" component={BathroomSelectionScreen} />
        <Stack.Screen name="Club Details" component={ClubDetails} options={{
          title: '',
        }} />
        <Stack.Screen name="Club Main" component={ClubMain} data={1}  options={({ route }) => ({ title: route.params.name })} />  
        <Stack.Screen name="Bar Selection" component={BarSelection} />   
        <Stack.Screen name="Reciept Details" component={RecieptDetails} />   
        <Stack.Screen name="Drink Menu" component={DrinkMenu} />  
        <Stack.Screen name="Checkout" component={Checkout} />  
        <Stack.Screen name="Drink Selection" component={DrinkSelection} 
        options= {{headerShown:false}}/>    
        <Stack.Screen name="Bathroom List" component={BathroomList} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </MyProvider>
    </StripeProvider>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
  }
})