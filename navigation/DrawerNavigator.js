import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PetsScreen from '../screens/PetsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Pets" component={PetsScreen} />
    </Drawer.Navigator>
  );
}