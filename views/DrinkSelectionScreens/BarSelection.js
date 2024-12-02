import React, { useContext,useState,useEffect } from 'react';
import { View, Text, FlatList,StyleSheet} from 'react-native';

import BarSelectionItem from '../../component/BarSelectionItem.js'
import { MyContext } from '../../store/context.js';



function BarSelection({navigation}) {

  const [showList, setShowList] = useState(false)
  const {state} = useContext(MyContext);


  useEffect(() => {
    (async () => {
      setShowList(state.bars.length>0)
    })();
  }, [state]);

    return (
    <View style={{flex:1,backgroundColor:'white'}}>
      { showList &&
        <FlatList
        data={state.bars}
        renderItem={(item) => <BarSelectionItem data={item} navigation={navigation} />}
      />
      }
      { !showList &&
            <Text style={[currentStyles.container]}>Currently not accepting orders</Text>
      }
    </View>                                 
    );
  
}

export default BarSelection;


const currentStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  }
});