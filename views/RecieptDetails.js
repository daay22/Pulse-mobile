import React,{useEffect,useState,useContext} from 'react';
import { MyContext } from '../store/context.js'
import {Platform, View, Text, FlatList, Pressable, Button as CancelButton,Alert} from 'react-native';
import { Divider,Button } from 'react-native-paper';
import styles from "../style.js"
import RecieptItem from "../component/CheckoutItem.js"
import {loadOrder,clearOrder} from "../store/asyncStorage.js"
import service from "../api/orders.js"


export default function Checkout({navigation,route}){
    const [totalBill,setTotalBill]=useState(0)
    const [subTotalBill,setSubTotalBill]=useState(0)
    const [barName,setBar]=useState("")
    const [barDescription,setBarDescription]=useState("")
    const [barWaitTime,setBarWaitTime]=useState("")
    const [createdTime,setCreatedTime]=useState("")
    const [reciept,setReciept]=useState("")
    const [orderID,setOrderID]=useState("")
    const {state,inScreenOrdersUpdate,screenRemoveOrder,setActiveOrders,acceptedOrder} = useContext(MyContext);



    const handlePress = () => {
      // Display confirmation dialog
      Alert.alert(
        "Confirm Action",        // Title
        "Are you sure you want to proceed?", // Message
        [
          {
            text: "No", // 'No' button
            onPress: () => console.log("Action cancelled"), // Logic for 'No'
            style: "cancel"
          },
          {
            text: "Yes", // 'Yes' button
            onPress: () => {
              // Logic to run if 'Yes' is pressed
              console.log("Action confirmed");
              service.cancelOrder(route.params.Data.payment_ID,{cancel_reason:'User Cancelled',update_ID:route.params.Data.bar_ID})
              .then((data) => {
                console.log(data)
                if(data.error){
                  
                }
                else{
                  Alert.alert(
                    "Order Cancelled",
                    "The order was successfully cancelled.",
                    [{ text: "OK",
                      onPress: async () => {
                        // Navigate to another screen after hitting OK
                        clearOrder(route.params.Data.readable_ID)
                      screenRemoveOrder(route.params.Data.readable_ID)
                      var currentOrders = await loadOrder();
                      if(currentOrders.length===0){
                        console.log('success!')
                          setActiveOrders(false);
                      }
                        navigation.navigate('Receipt'); // Replace 'NextScreen' with your target screen
                      },
                     }]
                  );
                }
                
              })
              .catch((error)=>{
                Alert.alert('Order not cancelled',error.message);
              })
              //TODO
              //update the stores here if successful

            }
          }
        ],
        { cancelable: false } // Can't dismiss by tapping outside the dialog
      );
    };

    useEffect(()=>{
        async function initialize(){
          console.log('Davion in the recipt')

            setOrderID(route.params.Data.readable_ID)
            setBar(route.params.Data.barName)
            setBarDescription(route.params.Data.barDescription)
            if(route.params.Data.is_accepted){
              setBarWaitTime('Proceed to Pickup')
            }
            else{
              setBarWaitTime(route.params.Data.approximateWaitTime) // might be Data.item.item.Pending
            }
            setCreatedTime((''))

            
            setReciept(route.params.Data.item_list)
            console.log('here?')



            var cost = 0;
            var itemList = route.params.Data.item_list
            for(var iter=0;iter<route.params.Data.item_list.length;iter++){
              console.log(itemList[iter])
              console.log(itemList[iter].Cost +' x ' + itemList[iter].NumberOfDrinks)
                cost+= itemList[iter].Cost* itemList[iter].NumberOfDrinks
            }
            
            var total = cost+((cost*.06)+.5);
            cost = cost.toFixed(2)
            setSubTotalBill(cost)
            total= total.toFixed(2)
            setTotalBill(total);
           
        } 
        initialize();         
    },[])


    return(
        
        <View style={styles.container}>
          <View style={styles.headerContainer}>
        <View style={styles.headerBackground}>
          <Text style={styles.accountId}>{orderID}</Text>
        </View>
      </View>
          <View style={[{flexDirection:"row",marginBottom:24}]}>
          <Button labelStyle={{fontSize: 30}} icon="map-marker"/>
          <View style={[{flexDirection:"column"}]}>
          <Text style={[styles.checkoutData]}>{barName}</Text>
          <Text>{barDescription}</Text>
          </View>
          
          </View>
  
          <View style={[{flexDirection:"row",marginBottom:16}]}>
          <Button labelStyle={{fontSize: 30}} icon="clock-outline"/>
          <View style={[{flexDirection:"column"}]}>
          <Text style={[styles.checkoutData,]}>{barWaitTime}</Text>
          </View>
          
          </View> 
          
  
          <Text style={[styles.bigHeaderText,styles.primaryColor,styles.marginLeftHeader,styles.bottomHeaderMargin]}>Items</Text>
          <FlatList
          data={reciept}
          renderItem={(item) => <RecieptItem data={item}
          keyExtractor={(item) => item.index} />}
          />
          
          <Divider style={[{backgroundColor:"black",margin:12,}]}/>
          <View style={[styles.stretchFormItems,styles.verticalFormat]}>
              <Text style={[styles.checkoutText,styles.marginLeftHeader,styles.bottomHeaderMargin]}>Subtotal</Text>
              <Text style={[styles.checkoutText,styles.marginLeftHeader,styles.bottomHeaderMargin]}>(${subTotalBill})</Text>
          </View>
          <View style={[styles.stretchFormItems,styles.verticalFormat]}>
              <Text style={[styles.checkoutText,styles.marginLeftHeader,styles.bottomHeaderMargin]}>Service Charge</Text>
              <Text style={[styles.checkoutText,styles.marginLeftHeader,styles.bottomHeaderMargin]}>(${((subTotalBill*.06)+.5).toFixed(2)})</Text>
          </View>
          <View style={[styles.stretchFormItems,styles.verticalFormat]}>
              <Text style={[styles.checkoutText,styles.marginLeftHeader,styles.bottomHeaderMargin]}>Total</Text>
              <Text style={[styles.checkoutText,styles.marginLeftHeader,styles.bottomHeaderMargin]}>${totalBill}</Text>
          </View>
          {!route.params.Data.is_accepted &&
          <CancelButton title={'Cancel'} color="#4F47C7" style={styles.cancelButton} onPress={() => handlePress()} />
          }
         </View> 
        
    )
}