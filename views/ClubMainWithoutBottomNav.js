import React from 'react';
import { Button, View} from 'react-native';
import { Logs } from 'expo'
import { BottomNavigation, Text } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from "../style"

Logs.enableExpoCliLogging()

function ClubMain({navigation}) {

    return (
    <View style={[styles.inClubContainer]}>
        <View style={{paddingHorizontal:16,marginVertical:16}}>
        <Button  color="#4F47C7" title="Order a Drink" onPress={() => {navigation.navigate("Bar Selection")}}></Button>
        </View>
        <View style={{paddingHorizontal:16,marginVertical:16}}>
        <Button color="#4F47C7" title="Bathroom List" onPress={() => {navigation.navigate("Bathroom List")}}></Button>    
        </View>
        <View style={{paddingHorizontal:16,marginVertical:16}}>
        <Button color="#4F47C7" title="VIP services" onPress={() => {navigation.navigate("VIP Servicess")}}></Button>    
        </View>
    </View>                                 
    );
  
}

export default ClubMain;