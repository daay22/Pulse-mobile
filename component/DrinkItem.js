import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions,Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {formatDollar} from '../utilities.js'
import {DrinkTypes} from '../StaticData.js'

function getPictureSize(){
  return {
    width: Dimensions.get('window').width *.25,
    height: Dimensions.get('window').width *.25
  };
}

function ListItem({data,shoppingCart,bar}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate({name:"Drink Selection",params:{DrinkChoice:data,ShoppingCart:shoppingCart,Bar:bar}})}} style={styles.object}>
    <View style ={styles.textbox}>
    <Text style={{fontWeight: 'bold',  fontSize:20  }}>{data.name}</Text>
     <Text style ={{paddingVertical:7}}>$ {data.cost}</Text>
     <Text>{data.description}</Text>

     </View>
     <Image style={getPictureSize()} source={{uri: data.image}} />
    </TouchableOpacity> 
  );
}

export default ListItem;

const styles = StyleSheet.create({
  object: {
    flexDirection: "row",
    marginVertical:15,

    
  },
  textbox:{
    flexDirection:"column",
    flex:1,
  },
  button:{
    marginHorizontal:10,
    paddingHorizontal:10
  }
});
