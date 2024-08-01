import React, { useEffect, useState,useContext } from 'react';
import {View,Pressable, Button,FlatList,StyleSheet} from 'react-native';

import { Text } from 'react-native-paper';
import styles from '../../style';
import Ionicons from '@expo/vector-icons/Ionicons';
import RecieptItem from '../../component/RecieptItem'
import {MyContext } from '../../store/context';



function ReceiptScreen({navigation}) {

  const [reciept, setReciept] = useState(null);
  const [showList, setShowList] = useState(false)
  const {state} = useContext(MyContext);


  useEffect(() => {
    (async () => {
      console.log('state has been seen in the recipt')
      console.log(state)
      setShowList(state.inScreenOrders.length>0)
    })();
  }, [state]);



    return (
      
        <View style={[currentStyles.container]}>
          { showList &&
            <FlatList
          data={state.inScreenOrders}
          renderItem={(item) => <RecieptItem data={item} navigation={navigation}
          keyExtractor={(item) => item.index} />}
          />
          }

          { !showList &&
            <Text style={[currentStyles.container]}>Currently no orders</Text>
          }

    </View>                            
    );
  
}

export default ReceiptScreen;


const currentStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    }
  });