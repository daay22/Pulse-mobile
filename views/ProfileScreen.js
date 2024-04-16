import React, { useState, useEffect} from 'react';
import { Button, Text, TextInput, View} from 'react-native';
import styles from '../style';
//import ImageIconHolder from '../assets/ImageIconHolder'
import { Logs } from 'expo'

Logs.enableExpoCliLogging()


function ProfileScreen({route, navigation}){

  const [alias, setAlias] = useState("");
  //https://github.com/react-native-device-info/react-native-device-info#getphonenumber
  //Research into ways to prepopulate the Phone Number of the user for IOS, maybe FB or Instagram profile
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [bathroom, setBathroom] = useState("");

  const [todo, setTodo] = useState("");
  


  /*useEffect(() =>{
    service.getTodos(1)
    .then(data => {
      setTodo(data.title);
    })
    .catch(error =>{
      console.log("Error in todo.")
    })
  })*/

return(
  <View style= {[styles.container]}>
    <Text style= {[styles.formLabel]}>Alias*</Text>
    <TextInput style= {[styles.textInputStyle]} value={alias} onChangeText = {e => setAlias(e)}></TextInput>    
    <Text style= {[styles.formLabel]}>Phone Number</Text>
    <TextInput keyboardType='phone-pad' style= {[styles.textInputStyle]} value={phoneNumber} onChangeText = {e => setPhoneNumber(e)}></TextInput> 
    <Text style= {[styles.formLabel]}>Bathroom</Text>
    <TextInput style= {[styles.textInputStyle]} value={route.params?.BathroomSelection ? route.params.BathroomSelection:""} onFocus = {() => {navigation.navigate('Bathroom Selection')}} />    
    <Text> A test of the API presents {todo}</Text>



    <Button title='Save Profile' onPress={() => {navigation.navigate("Club Search")}}></Button>

  </View>
)

}

export default ProfileScreen;