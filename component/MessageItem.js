import {React,View} from 'react';
import { Text, StyleSheet, Image, Dimensions,Button, TouchableOpacity,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Title } from 'react-native-paper';
import * as SMS from "expo-sms"



//import styles from '../style';

function MessageItem({data}) {

  
  const sendSMS = async() =>{
    if(data.recipients || data.textMessage){
      await SMS.sendSMSAsync(
      data.recipients,
      data.textMessage
    );
    }
    
  } 


  return (
    <Card class="mb-2" style={{marginVertical:2}} mode="elevated" elevated="5" onPress={() => {sendSMS()}}>
        <Card.Title leftStyle = {{width: Dimensions.get('window').width *.20,
    height: Dimensions.get('window').width *.20}}  left={() =>  <MaterialCommunityIcons style name="chat" size={32} color="white" />} titleStyle={{fontWeight: 'bold',color:'#4F47C7'}} title={data.groupName} subtitle={data.message} />
      </Card>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 10,
    },
    messageContainer: {
      marginBottom: 10,
    },
    sender: {
      fontWeight: 'bold',
      marginBottom: 2,
    },
    message: {
      fontSize: 16,
      marginBottom: 2,
    },
    timestamp: {
      fontSize: 12,
      color: '#777777',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'blue',
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  

export default MessageItem;