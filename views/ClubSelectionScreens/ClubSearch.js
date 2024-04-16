import React, { useState, useEffect} from 'react';
import {View, StyleSheet, FlatList,Button, Text} from 'react-native';
import ClubSearchItem from "../../component/ClubSearchItem.js";
import * as Location from 'expo-location';
import { Searchbar } from 'react-native-paper';
import service from "../../api/user.js"

import { Logs } from 'expo'
Logs.enableExpoCliLogging()


function ClubSearch({navigation}) {


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] =useState(null);
  const [clubData, setSearchData] =useState(null);
  const [loading, setLoading] =useState(null);

  useEffect(() =>{
    const getLocal= async()=>{
      console.log("Loading is" +location)
    console.log("location is" +location)
    let { status } =  Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        //return;
      }
      await Location.getCurrentPositionAsync({}).then(res =>{
        setLocation(res);
        setLoading(false);
        console.log("the location is "+location.coords.latitude+", "+location.coords.longitude)
      })
    }
     getLocal();
  },[])

const onChangeSearch = query => setSearchQuery(query);

const  fetchData = async() =>{
  setLoading(true);
  console.log("Location loading is " +loading)
  let { status } =  Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      //return;
    }
    await Location.getCurrentPositionAsync({}).then(res =>{
      setLocation(res);
      console.log("The location is "+location)
    })
}


useEffect(() =>{
  console.log("Check data")
  if(location){
    console.log("location changed "+ location.coords.latitude)
    findNearbyClubs(location.coords.latitude,location.coords.longitude)
  }
 
},[location])


const findNearbyClubs = async(lat,long) =>{
  console.log(lat+",params "+long)
  await service.getNearbyClubs()
  .then(data => {
    setSearchData(data);
    setLoading(false);
   //console.log("I have arrived in the data set and loading is now "+ loading);
   console.log("there are this many items in the list:" +clubData)})
  .catch(error =>{
    console.log("Error in call.")
  })
}


  


  return (
    <View>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <FlatList
        data={clubData}
        renderItem={(item) => <ClubSearchItem navigation={navigation} data={item} />}
        keyExtractor={(item) => item.index}
      />
      
    </View>
  );

}

export default ClubSearch;