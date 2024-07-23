// screens/HomeScreen.js

import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Platform} from 'react-native';
// import * as Application from 'expo-application';
import DeviceInfo from 'react-native-device-info';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MyContext,MyProvider } from './store/context';
import Ionicons from '@expo/vector-icons/Ionicons';
import service from './api/customer'
import { Alert } from "react-native";
import { loadOrder,updateAsyncFromDB, clearAsync as startFresh } from './store/asyncStorage';

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const {state,load,setActiveOrders, clear, inScreenOrdersUpdate} = useContext(MyContext);
  const [scanned, setScanned] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  

  useEffect(() => {
    async function setup() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');

      startFresh()

      var currentOrders = await loadOrder();

      if(currentOrders.length>0){
        console.log('Navigate straight to screen')
        setScanned(true);
        setActiveOrders(true);
        const deviceID = DeviceInfo.getDeviceId();;

        service.getVenueInfo(currentOrders[0].VenueID,deviceID)
    //TODO add in a call to the backend to check the status of all of the orders.
    .then(jsonData => {
      console.log('Im in there')
      console.log(jsonData)
      if(jsonData.data.venue){ //jsonData.action.payload.data.venue
        console.log(jsonData);
        var submitObject = {...jsonData}
        load(jsonData)
        navigation.navigate('Club Main', { name: state.venue.venue_name })
        setScanned(false)
        
      }
      else{
        Alert.alert('Not a valid Barcode')
      }
      
    }).catch(error => {console.log(error)
      Alert.alert('Scan Error','Failed to get information. Please try again',[{text:'OK',onPress:()=>  setScanned(false)}])
  });
      }
      



    }
    
    setup();
    ;
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('Scanned is: '+ scanned)
    if(!scanned){
      setScanned(true);
    console.log(data)
    service.getVenueInfo(data)
    // You can perform additional checks on the barcode data if needed
    .then(jsonData => {
      console.log(jsonData)
      if(jsonData.data.venue){ //jsonData.action.payload.data.venue
        clear();
        load(jsonData)
        navigation.navigate('Club Main', { name: state.venue.venue_name })
        setScanned(false)
        
      }
      else{
        Alert.alert('Not a valid Barcode')
      }
      
    })
    .catch(error => {console.log(error)
        Alert.alert('Scan Error','Failed to scan barcode or is invalid. Please try again',[{text:'OK',onPress:()=>  setScanned(false)}])
    });
    //navigation.navigate('Club Main', { barcodeData: data });
    }
    
  };

  const handleInputChange = (text) => {
    setInputCode(text);
  };

  const testNav = () => {
    Alert.alert('Scan Business barcode')

  };


  const handleTextInputSubmit = () => {
    // You can perform additional checks on the input code if needed
    navigation.navigate('Result', { barcodeData: inputCode });
  };

  return (
    <View style={styles.container}>
      { isFocused ? <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />: null
      }
      
      <View style={styles.box}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
       <TouchableOpacity style={styles.actionButton} onPress={()=>testNav()}>
       <Ionicons name="document-text"   size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    position: 'absolute',
    bottom: 40, // Adjust this value to set the distance from the bottom
    right: 40, // Adjust this value to set the distance from the right
    width: 60,
    height: 60,
    borderRadius: 30, // Half of the width and height to make it circular
    backgroundColor: '#4F47C7', // Your desired background color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add elevation for a slight shadow effect (Android)
    shadowColor: '#000', // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.8, // Shadow opacity (iOS)
    shadowRadius: 3, // Shadow radius (iOS)
  },
  scanner: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 200,
    height: 40,
    marginTop: 20,
    padding: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  box: {
    position: 'absolute',
    justifyContent:'center',
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.3,
    top: (Dimensions.get('window').height * 0.6 - Dimensions.get('window').height * 0.081) / 2,
    left: (Dimensions.get('window').width - Dimensions.get('window').width * 0.6) / 2,
  },
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderWidth: 6,
    borderColor: 'white',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  }
});
