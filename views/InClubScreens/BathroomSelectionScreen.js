import React from 'react';
import { Button, View} from 'react-native';





function BathroomSelectionScreen({navigation}) {

    return (
    <View>
        <Button title="Men's Bathroom" onPress={() => {navigation.navigate({name: 'Profile Creation', params: { BathroomSelection: "Men's Restroom" },merge: true})}}>Men's Restroom</Button>
        <Button title="Women's Bathroom" onPress={() => {navigation.navigate({name: 'Profile Creation', params: { BathroomSelection: "Women's Restroom" },merge: true})}}>Women's Restroom</Button>
    </View>                                 
    );
  
}

export default BathroomSelectionScreen;