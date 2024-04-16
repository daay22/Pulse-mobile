
import AsyncStorage from '@react-native-async-storage/async-storage';
import { statusUpdates } from '../StaticData';





// Save order data to AsyncStorage
const saveOrder = async (orderID,orderData) => {
  try {
    console.log('dave trynna save the order')
    await AsyncStorage.setItem(orderID, JSON.stringify(orderData));
  
    console.log('Order in async saved successfully:');
    console.log(orderData)
  } catch (error) {
    console.error('Error saving order:', error);
  }
};



// Load order data from AsyncStorage
const loadOrder = async () => {
  try {
    const getKeys = await AsyncStorage.getAllKeys()
    const orderData = await Promise.all(getKeys.map(key => AsyncStorage.getItem(key)))
    const jsonData = orderData.map(item => JSON.parse(item))
    if (jsonData.length!==0) {
      // Order data found, do something with it
      console.log('Loaded order data:', orderData);
      return jsonData;
    } else {
      console.log('No saved order data found');
      return [];
    }
  } catch (error) {
    console.error('Error loading order:', error);
  }
};

// Save order data to AsyncStorage
const updateOrder = async (orderData) => {
  try {
    console.log('updating order in Async')
  var order = JSON.parse(await AsyncStorage.getItem(orderData.customer_ID));
  if(order){
    order.ID = orderData.readable_ID
  order.Pending=false
  order.approximateWaitTime=orderData.approximateWaitTime
  await saveOrder(orderData.customer_ID,order)
  return order
  }
  else{
    console.log('Order not found')
  }
  } catch (error) {
    console.error('Error saving order:', error);
  }
};
  const clearAsync = async() =>{
    await AsyncStorage.clear()
  }

  const updateAsyncFromDB = async(orders) => {
    await AsyncStorage.clear()
    console.log('updating from DB')
    console.log(orders)
    for (var iter=0;iter<orders.length;iter++){
      console.log('in the order Update')
      var neworder = {
        ID:orders[iter].readable_ID,
        Bar:orders[iter].bar_ID,
        Cart: orders[iter].itemList,
        Customer: orders[iter].customer_ID,
        Pending:false,
        Accepted:orders[iter].is_accepted,
        VenueID: orders[iter].venue._id,
        ApproximateTime:orders[iter].approximateWaitTime}
        console.log('test cart')
        console.log(neworder.Cart)
        saveOrder(orders[iter].customer_ID,neworder)
    }
  }


// Save order data to AsyncStorage
const isAccepted = async (ID) => {
  try {
  var order = JSON.parse(await AsyncStorage.getItem(ID));
  if(order){
  order.Accepted = true;
  await saveOrder(order.Customer,order)
  }
  else{
    console.log('Order not found')
  }
   
  } catch (error) {
    console.error('Error saving order:', error);
  }
};




// Clear order data from AsyncStorage
const clearOrder = async (id) => {
  try {
    
    let orders = await AsyncStorage.getItem(id);

    if(orders !== null){
        await AsyncStorage.removeItem(id);
        console.log('Order data cleared');
    }
    
  } catch (error) {
    console.error('Error clearing order data:', error);
  }
};


export { saveOrder,loadOrder,clearOrder,clearAsync, updateOrder,isAccepted, updateAsyncFromDB};