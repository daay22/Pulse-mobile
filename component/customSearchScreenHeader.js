import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

//will need to be passed in the closest city and displayed.
//OnPress change the city.
function customSearchHeader({navigation}) {
  return (
    <TouchableOpacity style={{fontWeight:'600',"text-decoration": "underline"}}>
        Washington DC
        </TouchableOpacity>
  );
}

export default customSearchHeader;