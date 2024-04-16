import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const RecieptItem = ({ data,navigation }) => {

  console.log('dave check the vibe')
  console.log(data)
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("Reciept Details",{Data:data.item})}} style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderNumberText}>{data.item.readable_ID}</Text>
        </View>
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>{data.item.barName}</Text>
        <Text style={styles.subTitle}>{data.item.barDescription}</Text>
      </View>
      {!data.item.is_accepted &&
      <View style={styles.rightContainer}>
        <Text style={styles.approximateTime}>Ready in:</Text>
        <Text style={styles.subTitle}>{data.item.approximateWaitTime}</Text>
      </View>
      }
      {data.item.is_accepted &&
      <View style={styles.rightContainerAccept}>
        <Text style={styles.approximateTime}>Proceed to pickup!</Text>
      </View>
      }
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flex:1
  },
  orderNumberContainer: {
    width: 90, // Adjust width to accommodate 6 digits
    height: 50, // Adjust height to maintain circle shape
    borderRadius: 25, // Adjust border radius to maintain circle shape
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 2,
    marginHorizontal:10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
  },
  rightContainer: {
    flex:1
  },
  rightContainerAccept: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flex:1
  },
  approximateTime: {
    fontSize: 16,
  },
});


export default RecieptItem;