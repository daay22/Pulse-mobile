import React, { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, Image, Dimensions, Platform, StatusBar, ScrollView } from 'react-native';
import { Logs } from 'expo'
import styles from "../../style.js"
import { formatDollar } from '../../utilities.js'
import { DrinkTypes } from "../../StaticData.js"
import NumericStepper from '../../component/NumericStepper.js';

Logs.enableExpoCliLogging()

function getPictureSize() {
  return {
    width: Dimensions.get('window').width * .60,
    height: Dimensions.get('window').width * .60,

  };
}



function ClubDetails({ route, navigation }) {

  const [description, setDescription] = useState("")
  const [count, setCount] = useState(1)

  const updateCount = (newValue) => {
    setCount(newValue)
  }

  const addtoCart = async () => {
    var drinkObject = {
      ID: route.params.DrinkChoice._id,
      Name: route.params.DrinkChoice.name,
      Cost: route.params.DrinkChoice.cost,
      Image: route.params.DrinkChoice.image,
      Description: description,
      NumberOfDrinks: count
    }

    const cart = route.params.ShoppingCart
    cart.push(drinkObject)

    navigation.navigate("Drink Menu", { Bar: route.params.Bar, ShoppingCart: cart })
  }

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <View style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image style={getPictureSize()} source={{ uri: route.params.DrinkChoice.image }} />
        </View>
        <View style={{ backgroundColor: "white", marginTop: 16, marginBottom: 8, paddingLeft: 16 }}>
          <Text style={[styles.headerText]}>{route.params.DrinkChoice.name}</Text>
          <Text style={[styles.headerSubLabel, styles.verticalFormat]} >{//formatDollar(
            route.params.DrinkChoice.cost}</Text>
          {route.params.DrinkChoice.description &&
            <Text style={[styles.verticalFormat, { color: "grey" }]}>{route.params.DrinkChoice.description}</Text>
          }
          <NumericStepper updateCount={updateCount} count={count} canDelete={false} />
        </View>

        <View style={{ backgroundColor: "white", marginTop: 8, marginBottom: 16, paddingLeft: 16 }}>
          <Text style={[styles.headerSubLabel, styles.verticalFormat]} >{route.params.DrinkChoice.item_type + " Options"}</Text>

          {route.params.DrinkChoice.item_type == DrinkTypes.Cocktail &&
            <View>
              <Text>Cocktail DropDown</Text>

            </View>


          }
          {route.params.DrinkChoice.item_type == DrinkTypes.Wine &&
            <Text>Wine DropDown</Text>
          }
          {route.params.DrinkChoice.item_type == DrinkTypes.Beer &&
            <Text>Beer DropDown</Text>
          }
        </View>


        <View style={{ backgroundColor: "white", marginTop: 8, marginBottom: 16, paddingHorizontal: 16 }}>
          <Text style={[styles.headerSubLabel, styles.verticalFormat]} >Special Instructions</Text>
          <TextInput
            style={{ height: 100, backgroundColor: "lightgrey", textAlignVertical: "top", paddingTop: 8, paddingLeft: 8 }}
            placeholder="Enter details here"
            onChangeText={newText => setDescription(newText)}
          />
          <Text style={[styles.verticalFormat, { color: "grey" }]}>Can cause price increase</Text>

        </View>



        <View style={[styles.footer]}>
          <Button color="#4F47C7" style={[styles.submitButton]} title="Add to cart" onPress={() => { addtoCart() }} />

        </View>
      </View>
    </ScrollView>
  );

}

export default ClubDetails;