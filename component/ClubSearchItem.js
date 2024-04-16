import {React,View} from 'react';
import { Linking, StyleSheet, Image, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Title } from 'react-native-paper';
import * as SMS from "expo-sms"

function getPictureSize(){
  return {
    width: Dimensions.get('window').width *.2,
    height: Dimensions.get('window').width *.2
  };
}

function ClubSearchItem({navigation,data}) {

    const name= data.item.name
    const time = "Time of closing"
    const concat = name+" : "+ time
    const location = data.item.address
    const picture = data.photo_url
    const priceLevel = data.index


    const sendSMS = async(title,address) =>{
      var recipients = ""
      var message = "Headed to "+title+ "!\r\n\r\n"+ address
      const result = await SMS.sendSMSAsync(
        recipients,
        message
      );
    } 




  return (
      <Card class="mb-2" style={{marginVertical:2}} mode="elevated" elevated="5" onPress={() => {navigation.navigate("Club Details",{name:name})}}>
        <Card.Title leftStyle = {{width: Dimensions.get('window').width *.20,
    height: Dimensions.get('window').width *.20}}  left={() => <Image style={getPictureSize()} source={picture} />} titleStyle={{fontWeight: 'bold',color:'#4F47C7'}} title={concat} subtitle={location} />
        <Card.Actions>
          <Ionicons name="arrow-up-circle"  onPress={() => {navigation.navigate("Club Main", { name: name })}} size={32} color="#4F47C7" />
          <Ionicons name="share-social" onPress={()=>{ sendSMS(name,location)}} size={32} color="#4F47C7" />
        </Card.Actions>
      </Card>
  );
}

export default ClubSearchItem;

const styles = StyleSheet.create({
  object: {
    marginLeft: Dimensions.get('window').width *.05,
    backgroundColor: '#ecf0f1',
    flexDirection: "row",
    marginVertical:15
    
  },
  textbox:{
    marginLeft:Dimensions.get('window').width *.05,
    flexDirection:"column",
    flex:1,
  },
  button:{
    marginHorizontal:10,
    paddingHorizontal:10
  }
});
