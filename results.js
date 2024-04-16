import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ResultScreen() {
  const route = useRoute();
  const { barcodeData } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Result:</Text>
      <Text>{barcodeData}</Text>
    </View>
  );
}