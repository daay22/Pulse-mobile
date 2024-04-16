import React, { useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import styles from '../../style'
import { MyContext } from '../../store/context.js';
import MessageItem from '../../component/MessageItem.js'

function Message({}) {



    const {state} = useContext(MyContext)

    const messagesData = [
        { id: '1', groupName: 'Security', message: 'Text Security about an issue', recipients:state.venue.security_phone_number },
        { id: '2', groupName: 'Club', message: 'Coming Soon!'},
        // Add more messages as needed
      ];

  return (
    <View style={styles.container}>
    <FlatList
      data={messagesData}
      renderItem={({ item }) => (
        <MessageItem data={item} />
      )}
      keyExtractor={item => item.id}
    />
  </View>

  );
}

export default Message;