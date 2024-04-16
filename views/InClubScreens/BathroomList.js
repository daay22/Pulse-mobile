import React, { useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import BathroomSearchItem from "../../component/BathroomSearchItem.js"
import styles from '../../style'
import { MyContext } from '../../store/context.js';




function BathroomList({}) {

  const {state} = useContext(MyContext)
  return (
    <View style={[styles.inClubContainer]}>
      <FlatList
        data={state.bathrooms}
        renderItem={(item) => <BathroomSearchItem data={item} />}
        keyExtractor={(item) => item._id}
      />
      
    </View>
  );
}

export default BathroomList;