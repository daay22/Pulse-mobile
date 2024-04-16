import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity,Alert } from 'react-native';
import { Card, Paragraph,Avatar } from 'react-native-paper';
import { Logs } from 'expo'
import { useEffect } from 'react';
import {Genders} from "../StaticData"

Logs.enableExpoCliLogging()

function getPictureSize(){
  return {
    width: Dimensions.get('window').width *.25,
    height: Dimensions.get('window').width *.25
  };
}


function BathroomSearchItem({data}) {

  var icon=""
  switch(data.item.gender){
    case Genders.Male:
      icon ="human-male"
      break;
    case Genders.Female:
      icon ="human-female"
      break;
    case Genders.Neutral:
      icon ="human-male-female"
      break;
  } 
  const LeftContent = props => <Avatar.Icon {...props} icon={icon} />

  return (
    
    <Card style={{marginVertical:2}} mode="elevated" elevated="5" >
        <Card.Title left={LeftContent}  titleStyle={{fontWeight: 'bold',color:'#4F47C7'}} title={data.item.name} />
        <Card.Content>
          <Paragraph>{data.item.description}</Paragraph>
        </Card.Content>
      </Card>
  );
}

export default BathroomSearchItem;

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
