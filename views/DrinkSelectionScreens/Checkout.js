import React,{useEffect,useState,useContext} from 'react';
import {Platform, View, Text, FlatList, Pressable} from 'react-native';
import { Divider,Button } from 'react-native-paper';
import styles from "../../style.js"
import RecieptItem from "../../component/CheckoutItem.js"
import { useStripe } from '@stripe/stripe-react-native';
import { Alert } from "react-native";
import {saveOrder} from "../../store/asyncStorage.js"
import { MyContext } from '../../store/context.js';


export default function Checkout({navigation,route}){
    const [totalBill,setTotalBill]=useState(0)
    const [subTotalBill,setSubTotalBill]=useState(0)
    const [barName,setBar]=useState("")
    const [barDescription,setBarDescription]=useState("")
    const [barWaitTime,setBarWaitTime]=useState("")
    const [reciept,setReciept]=useState("")
    const [clientSecret,setClientSecret] = useState("")
    const [ephemeralKey,setEphemeralKey] = useState("")
    const [customer,setCustomer] = useState("")
    const {state,setActiveOrders,inScreenOrdersUpdate} = useContext(MyContext);
    
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  //  const [publisherKey,setpublisherKey]=useState("")

  const initializePaymentSheet = async () => {
    setClientSecret()
    setEphemeralKey()
    setCustomer()
    const { error } = await initPaymentSheet({
      merchantDisplayName: route.params.Data.Bar.name,
      customerId: route.params.Data.Customer,
      customerEphemeralKeySecret: route.params.Data.EphemeralKey,
      paymentIntentClientSecret: route.params.Data.ClientKey,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      /*defaultBillingDetails: {
        name: 'Jane Doe',
      }*/
    });
    if (error) {
        console.log(error)
        Alert.alert(error);
    //  setLoading(true);
    }
  }; 

  const openPaymentSheet = async () => {
    const { error, paymentOption } = await presentPaymentSheet();

    if (error) {
        console.log(error)
        if(error.code=="Canceled"){
          //do nothing
        }
        else{
          Alert.alert(`Error code: ${error.code}`, error.message);
        }
    } else {
      Alert.alert('Success', 'Your order is confirmed!');

      const formatter = new Intl.DateTimeFormat('en-us',{hour:'2-digit',minute:'2-digit',second:'2-digit'})
      
      const pendingOrder = {
        ID:'',
        Bar:route.params.Data.Bar,
        Cart: route.params.Data.Cart,
        Customer: route.params.Data.Customer,
        Pending:true,
        Created: formatter.format(Date.now()),
        Accepted:false,
        VenueID: state.venue._id,
        ApproximateTime:''}

      console.log('Finished in the Checkout')
     // await saveOrder(pendingOrder.Customer,pendingOrder)
      await setActiveOrders(true)
      console.log('updated state?: ')
      console.log(state)
      //inScreenOrdersUpdate(pendingOrder)
      navigation.navigate("Receipt")
    }
  };

  useEffect(() => {
    setClientSecret(route.params.Data.ClientKey)
    setEphemeralKey(route.params.Data.EphemeralKey)
    setCustomer(route.params.Data.Customer)
    initializePaymentSheet();
  }, []);

    useEffect(()=>{
        async function initialize(){
            setBar(route.params.Data.Bar.name)
            setBarDescription(route.params.Data.Bar.description)
            //setBarWaitTime(route.params.Data.Bar.CurrentWaitTime)
            setBarWaitTime('1-3 Minutes')
            setReciept(route.params.Data.Cart)
            var cost = 0;
            for(var iter=0;iter<route.params.Data.Cart.length;iter++){
                cost+= route.params.Data.Cart[iter].Cost* route.params.Data.Cart[iter].NumberOfDrinks
            }
            
            var total = cost+((cost*.06)+.5);
            cost = cost.toFixed(2)
            setSubTotalBill(cost)
            total= total.toFixed(2)
            setTotalBill(total);
               /* const pKey = await service.getPublisherKey();
                if(pKey){
                    setpublisherKey(pKey)
                }*/
 
           
        } 
        initialize();         
    },[])
    return(
        
        <View style={styles.container}>
         <View style={[{flexDirection:"row",marginBottom:24}]}>
          <Button labelStyle={{fontSize: 30}} icon="map-marker"/>
          <View style={[{flexDirection:"column"}]}>
          <Text style={[styles.checkoutData]}>{barName}</Text>
          <Text>{barDescription}</Text>
          </View>
          
          </View>
           {/* 
          <View style={[{flexDirection:"row",marginBottom:16}]}>
          <Button labelStyle={{fontSize: 30}} icon="clock-outline"/>
          <View style={[{flexDirection:"column"}]}>
          <Text style={[styles.checkoutData,]}>{barWaitTime}</Text>
          </View>
          
          </View> */}
          
  
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
  
  
  
          <Pressable onPress={() =>  {openPaymentSheet()}} style={[styles.submitButton]}>
          <Text  style={{color:"white", fontSize:32}}>Checkout</Text>
        </Pressable>
         </View> 
        
    )
}