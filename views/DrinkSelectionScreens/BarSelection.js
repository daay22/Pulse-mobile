import React, { useContext } from 'react';
import { Button, View, Text, FlatList} from 'react-native';
import { Logs } from 'expo'
import BarSelectionItem from '../../component/BarSelectionItem.js'
import { MyContext } from '../../store/context.js';

Logs.enableExpoCliLogging()

function BarSelection({navigation}) {

  const {state} = useContext(MyContext)

    return (
    <View>
        <FlatList
        data={state.bars}
        renderItem={(item) => <BarSelectionItem data={item} navigation={navigation} />}
      />
    </View>                                 
    );
  
}

export default BarSelection;