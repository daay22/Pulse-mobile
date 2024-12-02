// screens/HomeScreen.js

import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { CameraView,Camera } from 'expo-camera';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MyContext, MyProvider } from './store/context';
import Ionicons from '@expo/vector-icons/Ionicons';
import service from './api/customer'
import { Alert } from "react-native";
import { loadOrder, updateAsyncFromDB, clearAsync as startFresh } from './store/asyncStorage';
import * as SecureStore from 'expo-secure-store';
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const { state, load, setActiveOrders, clear, inScreenOrdersUpdate } = useContext(MyContext);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const navigation = useNavigation();
  const isFocused = useIsFocused()


  function removeSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  useEffect(() => {
    async function setup() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      if (status === 'granted') {
        setHasPermission(true);
      } else if (status === 'denied') {
        Alert.alert(
          "Camera Permission Needed",
          "Pulse requires access to your camera. Please enable camera permissions in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        setHasPermission(false);
      }
      //In case data is Corrupted
      startFresh();
      //await SecureStore.deleteItemAsync('secure_deviceid')

      var deviceID = ''
        const fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
  //if user has already signed up prior
  if (fetchUUID) {
    deviceID = fetchUUID
    console.log('set existing ID'+ fetchUUID)
  }
  else{
    const uuid = uuidv4();
    const idString = removeSpecialCharacters(uuid)
    console.log(idString)
    await SecureStore.setItemAsync('secure_deviceid', idString);
    deviceID = uuid;
  }

      var currentOrders = await loadOrder();

      if (currentOrders.length > 0) {
        setIsLoading(true);
        console.log('Navigate straight to screen')
        setActiveOrders(true);
        

        service.getVenueInfo(currentOrders[0].VenueID, deviceID)
          .then(jsonData => {
            if (jsonData?.data?.venue) { //jsonData.action.payload.data.venue
              load(jsonData)
              setIsLoading(false);
              console.log(jsonData.data.venue)
              navigation.navigate('Club Main', { name: jsonData.data.venue.venue_name })

            }
            else {
              setIsLoading(false);
              Alert.alert('Error with data load. Please reload application.')
            }

          }).catch(error => {
            setIsLoading(false);
            console.log(JSON.stringify(error, null, 2), "usefEffect Bar Scan");
            Alert.alert('Scan Error', 'Failed to get information. Please try again', [{ text: 'OK', onPress: () => { } }])
          });
      }
      setIsLoading(false);




    }

    setup();
  }, []);

  const instructions = () => {
    Alert.alert('Welcome to Pulse', 'Scan business barcode to access features within the club')

  };

  const handleBarCodeScanned = ( type, data ) => {
    setScanned(true);
    setIsLoading(true);
    console.log("Barcode scanned")
    service.getVenueInfo(data)
      .then(jsonData => {
        if (jsonData?.data?.venue) { //jsonData.action.payload.data.venue
          console.log(jsonData)
          setIsLoading(false);
          clear();
          load(jsonData)
          console.log(jsonData.data.venue)
          navigation.navigate('Club Main', { name: jsonData.data.venue.venue_name })
        }
        else {
          console.log(JSON.stringify(jsonData, null, 2), "else");
          setIsLoading(false);

          Alert.alert('Not a valid barcode')
        }

      })
      .catch(error => {
        console.log(error)
        console.log(JSON.stringify(error, null, 2), "handleBarCodeScanned function");
        setIsLoading(false);
        Alert.alert('Scan Error', 'Failed to scan barcode or is invalid. Please try again', [{ text: 'OK', onPress: () => { } }])
      });
    //navigation.navigate('Club Main', { barcodeData: data });

  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {isFocused ?
        <CameraView
        onBarcodeScanned={({ data,type }) => {
          if (!scanned) {
            handleBarCodeScanned(type,data)
          }
        }}
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
        : null
      }

      {scanned && !isLoading && (
        <View style={styles.overlayNew}>
          <Button title={'Scan Again'} color="#4F47C7" style={styles.tryAgainButton} onPress={() => {setScanned(false);}} />
        </View>
      )}

      {isLoading && (
       <View style={styles.loadingOverlay}>
       <ActivityIndicator size="large" color="#ffffff" />
       <Text style={styles.loadingText}>Processing...</Text>
     </View>
      )}
      {!scanned && !isLoading && (
      <View style={styles.box}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
      )}
      <TouchableOpacity style={styles.actionButton} onPress={() => instructions()}>
        <Ionicons name="document-text" size={32} color="white" />
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
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensures this view is on top
    elevation: 10, // Additional elevation for Android

  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 10, // Ensures this view is on top
    elevation: 10,
  },
  tryAgainButton: {
 // Half of the width and height to make it circular
    
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
  overlayNew: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  box: {
    position: 'absolute',
    justifyContent: 'center',
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
