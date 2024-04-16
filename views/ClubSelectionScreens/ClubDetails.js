import React from 'react';
import {View,Pressable, Button as Submit,TouchableOpacity,StyleSheet} from 'react-native';
import { Logs } from 'expo'
import { Text,Button } from 'react-native-paper';
import styles from '../../style';
import Ionicons from '@expo/vector-icons/Ionicons';

Logs.enableExpoCliLogging()

function ClubDetails({navigation}) {

    return (
        <View style={[currentStyles.container]}>
    <View  style={{marginVertical:10,flex:1,alignItems:"flex-start"}}>
         <Text variant="displaySmall" style={{fontWeight: 'bold'}}>The Park at 14th</Text>
        <Button icon="clock-time-five-outline">
  9:00 PM - 2:00 AM
</Button>
<Button icon="google-maps">
123 Example Way Lactio, State 12345
</Button>
<Button icon="currency-usd">
20
</Button>

<Text style={{fontWeight: 'bold', marginVertical:10}} variant="titleLarge">Club Details</Text>
<Text>Create a component that will be the detail page of a Club</Text>


<Text style={{fontWeight: 'bold',marginVertical:10}} variant="titleLarge">Drink Specials</Text>
<Text style={{marginBottom:15}}>Create a component that will be a list item for all data.</Text>


    </View> 
    <View style={[styles.footer]}>
    <Pressable onPress={() =>  {navigation.navigate("Club Main", { name: "The Park at 14th" })}} style={[styles.submitButton]}>
      <Text  style={{color:"white", fontSize:32}}>In the Club</Text>
    </Pressable>
    </View>
    </View>                                
    );
  
}

export default ClubDetails;


const currentStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    }
  });