import React from 'react';
import { Text, View, Dimensions,Button, TouchableOpacity } from 'react-native';
import styles from '../style';


function recieptItem({data}) {

  return (
    <View style={[styles.stretchFormItems,styles.verticalFormat]}>
        <View style={{
          flex: 2,

        }} >
             <Text style={[styles.checkoutText,styles.marginLeftHeader]}>{data.item.NumberOfDrinks} X {data.item.Name}</Text>
        </View>
        <View style={{
          flex: 1,
        }} >
            <Text style={[styles.checkoutText,styles.alignRight]}>${data.item.Cost* data.item.NumberOfDrinks}</Text>
        </View>
      </View>

    
  );
}

export default recieptItem;