// screens/HomeScreen.js
import React,  { useState, useContext, useEffect } from "react";
import { View, StyleSheet,Text,Button, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import {Platform} from 'react-native';
// import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MyContext } from './store/context';
import Ionicons from '@expo/vector-icons/Ionicons';
import service from './api/customer'
import { Alert } from "react-native";
import { loadOrder,updateAsyncFromDB, clearAsync as startFresh } from './store/asyncStorage';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const {state,load,setActiveOrders, clear, inScreenOrdersUpdate} = useContext(MyContext);
  const [scanned, setScanned] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused()



  function removeSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
  }



  useEffect(() => {
    async function setup() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');
      //In case data is Corrupted
      startFresh();
      await SecureStore.deleteItemAsync('secure_deviceid')

      var deviceID = ''
        const fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
  //if user has already signed up prior
  if (fetchUUID) {
    deviceID = fetchUUID
  }
  else{
    const uuid = uuidv4();
    console.log(uuid)
    const idString = removeSpecialCharacters(uuid)
    console.log(idString)
    await SecureStore.setItemAsync('secure_deviceid', idString);
    deviceID = uuid;
  }

      var currentOrders = await loadOrder();

      if(currentOrders.length>0){
        console.log('Navigate straight to screen')
        setScanned(true);
        setActiveOrders(true);
        console.log(currentOrders)
        

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

  const instructions = () => {
    Alert.alert('Scan Business barcode')

  };



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
        setScanned(false)
      }
      
    })
    .catch(error => {console.log(error)
        Alert.alert('Scan Error','Failed to scan barcode or is invalid. Please try again',[{text:'OK',onPress:()=>  setScanned(false)}])
    });
    //navigation.navigate('Club Main', { barcodeData: data });
    }
    
  };

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.box}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
       <TouchableOpacity style={styles.actionButton} onPress={()=>instructions()}>
       <Ionicons name="help"   size={32} color="white" />
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
/*
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import {Platform} from 'react-native';
// import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MyContext } from './store/context';
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
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');
      //startFresh();

      var currentOrders = await loadOrder();

      if(currentOrders.length>0){
        console.log('Navigate straight to screen')
        setScanned(true);
        setActiveOrders(true);
        var deviceID = ''
        const fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
  //if user has already signed up prior
  if (fetchUUID) {
    deviceID = fetchUUID
  }
  else{
    const uuid = uuidv4();
    await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(uuid));
    deviceID = uuid;
  }

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

  const instructions = () => {
    Alert.alert('Scan Business barcode')

  };


  const handleTextInputSubmit = () => {
    // You can perform additional checks on the input code if needed
    navigation.navigate('Result', { barcodeData: inputCode });
  };

  return (
    <View style={styles.container}>
      { isFocused ? <CameraView
        onBarCodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />: null
      }
      
      <View style={styles.box}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
       <TouchableOpacity style={styles.actionButton} onPress={()=>instructions()}>
       <Ionicons name="help"   size={32} color="white" />
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
});*/
