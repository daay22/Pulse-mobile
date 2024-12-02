import React from 'react';
import { Text, View, Dimensions,Button, TouchableOpacity } from 'react-native';
import styles from '../style';

function BarSelectionItem({navigation,data}) {
  return (
    <TouchableOpacity style={{padding:5,backgroundColor:'white'}} onPress={()=>{navigation.navigate("Drink Menu",{Bar:data.item,ShoppingCart:[]})}} >
    <View>   
    <Text style={[styles.primaryColorHeader]}>{data.item.name}</Text>
     <Text style={{paddingTop:5,paddingBottom:3,color:"#4F47C7",}}>{data.item.description}</Text>
     <Text style={{fontStyle: 'italic'}}>{data.item.approximateWaitTime}</Text>
     </View>
    </TouchableOpacity>
  );
}

export default BarSelectionItem;