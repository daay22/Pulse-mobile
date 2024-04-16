import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet,Pressable, } from 'react-native';
import Modal from 'react-native-modal';
import {IconButton} from 'react-native-paper'
import FinalSelectionItem from './FinalSelectionItem'
import { Divider } from 'react-native-paper';
import global from '../style';

import { useFocusEffect } from '@react-navigation/native';


const BottomDrawer  = ({updateCount,deleteItem, bar,isVisible,onClose,goToCheckout,shoppingCart}) => {


  const [subtotalCost, setSubtotalCost] = useState(0);

  const [isUnmounting, setIsUnmounting] = useState(false)

  seeUpdate = (ID,value) => {
      updateCount(ID,value)
      getSubtotal()
  }


const getSubtotal = () => {
        var cost =0
        for (var item = 0; item < shoppingCart.length; item++) {
          cost += shoppingCart[item].NumberOfDrinks * shoppingCart[item].Cost
        }
        setSubtotalCost(cost)
}

useEffect(()=>{
  return () => {
  setIsUnmounting(true);
  };
  
}, []);


useLayoutEffect (() =>{
  if(isUnmounting){
    setLoading(false);
    setIsUnmounting(false);
  }
},[isUnmounting]);



  return (
     <View style={styles.container}>

      <Modal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={onClose}
        style={styles.drawer}
        onModalShow={getSubtotal}
      >
        <View style={styles.drawerContent}>
        <IconButton onPress={onClose} size={32} textColor='grey' style={styles.buttonContainer} icon="close-thick" />
        <View >
       <Text style={{fontWeight: 'bold',  fontSize:32  }}>{bar.name}</Text>
     </View>
     
        <FlatList
        data={shoppingCart}
        renderItem={(item) => <FinalSelectionItem data={item} updateCount={seeUpdate} deleteItem={deleteItem} />}
        keyExtractor={(item) =>  item.ID}
      />
      
      <Divider style={[{marginVertical:16, paddingVertical:4}]} bold={true}/>
      <View style={[global.stretchFormItems,global.verticalFormat]}>
              <Text style={[global.checkoutText,global.marginLeftHeader,global.bottomHeaderMargin]}>Subtotal</Text>
              <Text style={[global.checkoutText,global.marginLeftHeader,global.bottomHeaderMargin]}>${subtotalCost}</Text>
          </View>


          <Pressable onPress={() =>  {goToCheckout()}} style={[styles.submitButton]}>
          <Text  style={{color:"white", fontSize:32}}>Checkout</Text>
        </Pressable>


          {/* Other content for your drawer goes here */}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  drawer: {
    margin: 0,
  },
  drawerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 4,
    flex:1
  },
  drawerButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginBottom: 10,
  },
  drawerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    color:'grey',
    fontSize:32
  },
  buttonContainer: {
    fontSize:64,
    width: 30,
    height: 30,
    marginTop:8,
    marginLeft:8,
    borderRadius: 3, // Half of the width and height to make it circular
    elevation: 5, // Add elevation for a slight shadow effect (Android)
    shadowColor: '#000', // Shadow color (iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (iOS)
    shadowOpacity: 0.8, // Shadow opacity (iOS)
    shadowRadius: 3, // Shadow radius (iOS)
  },
  submitButton:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingBottom: 6,
    marginBottom:12,
    backgroundColor:"black"
  },
});
export default BottomDrawer;