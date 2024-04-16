import React from 'react';
import { Button,Text, View, Pressable} from 'react-native';
import { Logs } from 'expo'
import styles from "../../style"

Logs.enableExpoCliLogging()

function VIPService({navigation}) {

    return (
    <View style={[styles.inClubContainer]}>
        <View style={{paddingHorizontal:16,marginTop:16,marginBottom:8}}>
        <Pressable onPress={() =>  {navigation.navigate("Club Main", { name: 'Name of Club' })}} style={[styles.submitButton]}>
      <Text  style={{color:"white", fontSize:32}}>Rent a Table</Text>
    </Pressable>
        </View>
        <View style={{paddingHorizontal:16,marginVertical:8}}>
        <Pressable onPress={() =>  {navigation.navigate("Club Main", { name: 'Name of Club' })}} style={[styles.submitButton]}>
      <Text  style={{color:"white", fontSize:32}}>Check in</Text>
    </Pressable>
        </View>
        <View style={{paddingHorizontal:16,marginVertical:8}}>
        <Pressable onPress={() =>  {navigation.navigate("Club Main", { name: 'Name of Club' })}} style={[styles.submitButton]}>
      <Text  style={{color:"white", fontSize:32}}>VIP services</Text>
    </Pressable>
        </View>
        <View style={{paddingHorizontal:16,marginVertical:16}}>
        <Pressable onPress={() =>  {navigation.navigate("Club Main", { name: 'Name of Club' })}} style={[styles.submitButton]}>
      <Text  style={{color:"white", fontSize:32}}>Bottle Service</Text>
    </Pressable>
        </View>
        <View style={{paddingHorizontal:16,marginVertical:16}}>
        <Pressable onPress={() =>  {navigation.navigate("Club Main", { name: 'Name of Club' })}} style={[styles.submitButton]}>
      <Text  style={{color:"white", fontSize:32}}>Table Location</Text>
    </Pressable>
        </View>
    </View>                                 
    );
  
}

export default VIPService;