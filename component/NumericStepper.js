import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {IconButton} from 'react-native-paper'

const NumericStepper = ({updateCount,count,canDelete,deleteItem,ID}) => {

  const handleIncrement = () => {
    console.log('Increment 1')
    updateCount(count+1)
  };

  const handleDecrement = () => {
    if (count > 1) {
      console.log('decrement 1')
      updateCount(count-1)
    }
  };
  const showTrash = () => {
      return canDelete && count==1
  }

  return (
    <View style={[styles.container,styles.stepper]}>
      { !showTrash() &&
      <TouchableOpacity style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      }
      { showTrash() &&
      <TouchableOpacity style={styles.button} >
        <IconButton onPress={() => deleteItem(ID)} style={[{paddingTop:8,paddingLeft:4}]} size={24} iconColor='white' icon="trash-can" />
      </TouchableOpacity>
      }

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey', // Change the background color as needed
    overflow: 'hidden',
    marginVertical:16
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'grey'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Change the text color as needed
    backgroundColor:'grey'
  },
  counterContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // Change the text color as needed
  },
  
  
});

export default NumericStepper;
