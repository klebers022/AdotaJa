// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import PetsScreen from './screens/PetsScreen';
import CadastroScreen from './screens/CadastroScreen';
import ContatoScreen from './screens/ContatoScreen';
import ParticipantesScreen from './screens/ParticipantesScreen';
import Header from './components/header';
import DrawerNavigator from './navigation/DrawerNavigator';

// 👉 Tela de detalhe (transição com slide)
import PetDetalheScreen from './screens/PetDetalheScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Pets') iconName = 'paw-outline';
          else if (route.name === 'Cadastro') iconName = 'clipboard-outline';
          else if (route.name === 'Contato') iconName = 'call-outline';
          else if (route.name === 'Participantes') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff914d',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarItemStyle: { paddingVertical: 2 },
        tabBarStyle: styles.tabBar,
        // Dica: combine com animações dentro das telas (Moti) para um efeito mais “suave” entre tabs
      })}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pets" component={PetsScreen} />
      <Tab.Screen name="Cadastro" component={CadastroScreen} />
      <Tab.Screen name="Contato" component={ContatoScreen} />
      <Tab.Screen name="Participantes" component={ParticipantesScreen} />
      {/* Drawer invisível na Tab */}
      <Tab.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Tabs"
              screenOptions={{
                headerShown: false,
                // 👉 Transição global entre telas do Stack
                animation: 'fade', // opções: 'slide_from_right', 'slide_from_bottom', 'simple_push'
                gestureEnabled: true,
              }}
            >
              {/* Tabs como raiz */}
              <Stack.Screen name="Tabs" component={Tabs} />

              {/* Telas filhas com transição animada */}
              <Stack.Screen
                name="PetDetalhe"
                component={PetDetalheScreen}
                options={{
                  animation: 'slide_from_right',
                  presentation: 'card',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    width: '90%',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#f8f3ee',
    height: 60,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
