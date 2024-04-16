import React,{useEffect} from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import {formatDollar} from '../utilities.js'
import {DrinkTypes} from '../StaticData.js'
import NumericStepper from './NumericStepper.js';

function getPictureSize(){
  return {
    width: Dimensions.get('window').width *.15,
    height: Dimensions.get('window').width *.15
  };
}



function FinalSelectionItem({updateCount,data,deleteItem}) {

  const updateItemCount = (newValue) =>{
    data.item.NumberOfDrinks=newValue
    updateCount(data.item.ID,newValue)
   }
  return (
    <View>
      <View style={styles.object}>
    <Image style={getPictureSize()} source={{uri: data.item.Image}} />
    <View style ={styles.textbox}>
    <Text style={{fontWeight: 'bold',  fontSize:20  }}>{data.item.Name}</Text>
     <Text style ={{paddingVertical:7}}>$ {data.item.Cost}</Text>
     </View>
     <NumericStepper updateCount={updateItemCount} count={data.item.NumberOfDrinks} canDelete={true} deleteItem={deleteItem} ID={data.item.ID} /> 
    </View> 
    <Divider />
    </View>
    
  );
}

export default FinalSelectionItem;

const styles = StyleSheet.create({
  object: {
    flexDirection: "row",
    marginVertical:15,

    
  },
  textbox:{
    flexDirection:"column",
    flex:1,
    marginHorizontal:8
  },
  button:{
    marginHorizontal:10,
    paddingHorizontal:10
  }
});
