import React, { useEffect,useState,useContext } from 'react';
import {View, Text, SectionList,Pressable, ActivityIndicator} from 'react-native';

import DrinkItem from '../../component/DrinkItem'
import styles from "../../style.js"
import { MyContext } from '../../store/context';
import PaymentService from '../../api/payments'
import BottomDrawer from '../../component/BottomDrawer';
import { useFocusEffect } from '@react-navigation/native';
// import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';

function generateReadableID(){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomChars = '';
  for (let i = 0; i < 3; i++) {
    randomChars += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  const now = new Date();
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
 
   return randomChars + '-' + hours + minutes;
 }


function DrinkMenu({route,navigation}) {

  const [shoppingCart, setShoppingCart] = useState([]);
  const [bar, setBar] = useState(null);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [totalDrinks, setTotalDrinks] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);

  


  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };


  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const deleteItem = (id) => {
    const updateList = shoppingCart.filter((item) => item.ID !== id)
    setShoppingCart(updateList)
    if(updateList.length==0){
      closeDrawer()
    }
 }

  const updateCount = (id,value) => {
    const updateList = shoppingCart.map((item) => item.ID ===id? {...item,['NumberOfDrinks']:value}:item)
    setShoppingCart(updateList)
    var total = 0;
        var cost =0
        for (var item = 0; item < updateList.length; item++) {
          total += updateList[item].NumberOfDrinks;
          cost += updateList[item].NumberOfDrinks * updateList[item].Cost
        }
        console.log('new cost:'+cost)
        setTotalDrinks(total);
        setTotalCost(cost);
  }


  const {state} = useContext(MyContext)

  const DATA = [
    {
      title: "Liquor",
      data: state.items.filter(item => item.item_type=="Cocktail")
    },
    {
      title: "Wine",
      data: state.items.filter(item => item.item_type=="Wine")
    },
    {
      title: "Beer",
      data: state.items.filter(item => item.item_type=="Beer")
    },
    {
      title:"",
      data:""
    }
  ];
  useFocusEffect(
    React.useCallback(() => {
      // Your effect logic for when the component gains focus
      setShoppingCart(route.params.ShoppingCart);
      setBar(route.params.Bar);
  
  
      // Use the functional form of setShoppingCart
      setShoppingCart((prevShoppingCart) => {
        var total = 0;
        var cost =0
        for (var item = 0; item < prevShoppingCart.length; item++) {
          total += prevShoppingCart[item].NumberOfDrinks;
          cost += prevShoppingCart[item].NumberOfDrinks * prevShoppingCart[item].Cost
        }
        console.log('new cost:'+cost)
        setTotalDrinks(total);
        setTotalCost(cost);
  
  
        // Return the updated shoppingCart
        return prevShoppingCart;
      });
  
  
      // Cleanup function (if needed)
      return () => {
        console.log('Cleanup or effect for component blur or unmount');
        setLoading(false);
      };
    }, [route.params.ShoppingCart, route.params.Bar]) // Include dependencies in the dependency array
  );
    

    async function goToCheckout(){
      setLoading(true);
      toggleDrawer();
      const cartRequest = shoppingCart.map( item =>{
        var newItem = {...item}

        if('Image' in newItem){
          delete newItem['Image']
        }
        return newItem
      })

      console.log(cartRequest)
      const deviceID = await SecureStore.getItemAsync('secure_deviceid');
      const readableId = generateReadableID()

      const requestObject= {BarId:bar._id,Cart:cartRequest,VenueId:state.venue._id,UserID:state.venue.user_id, Cost:totalCost, DeviceId: deviceID,ReadableId:readableId}
      const returnJson = await PaymentService.createPaymentIntent(requestObject)
      console.log("created payment Intent")
      var checkoutObject = {
        Bar:bar,
        Cart: cartRequest,
        ClientKey: returnJson.clientSecret,
        EphemeralKey: returnJson.ephemeralKey,
        Customer: returnJson.customer,
        Cost: returnJson.totalCost,
        ID:readableId
      }
      console.log(checkoutObject)
      
      navigation.navigate("Checkout", { Data: checkoutObject })
    }

    const renderItem = ({ item }) => (
        <DrinkItem data={item} shoppingCart={shoppingCart} bar ={bar} />
      );

    return (
    <View style={{flex:1,marginHorizontal:8}}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <SectionList 
            sections={DATA}
            keyExtractor={(item,index) => item+index}
            renderItem = {renderItem}
            renderSectionHeader = {({section: {title}}) => (
                <Text style={styles.headerText}>{title}</Text>
            )}
        />
        
      {shoppingCart.length>0 &&
        <View style={[styles.footer]}>
        <Pressable  onPress={toggleDrawer} style={[styles.submitButton]}>
          <Text  style={{color:"white", fontSize:32}}>View Cart({totalDrinks})</Text>
        </Pressable>
        </View>
        }

        <BottomDrawer updateCount={updateCount} deleteItem={deleteItem} bar = {route.params.Bar} shoppingCart = {shoppingCart} isVisible = {isDrawerVisible} onClose = {closeDrawer} goToCheckout={goToCheckout}/>
        
    </View>                                 
    );
  
}

export default DrinkMenu;
