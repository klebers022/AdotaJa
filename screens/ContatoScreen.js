import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

export default function ContatoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/Contato.jpeg')} style={{ width: 300, height: 500 }}/>
    </View>
  );
}
