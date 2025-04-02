import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importando as telas
import HomeScreen from './screens/HomeScreen';
import PetsScreen from './screens/PetsScreen';
import CadastroScreen from './screens/CadastroScreen';
import ContatoScreen from './screens/ContatoScreen';
import ParticipantesScreen from './screens/ParticipantesScreen';

// Criando o Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Header fixo com a logo */}
      <View style={styles.header}>
        <Image
          source={require('./assets/icon.png')} // Caminho da sua logo
          style={styles.logo}
        />
      </View>

      {/* Bottom Tab Navigator */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Remove o header padrão
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Pets') {
              iconName = 'paw-outline';
            } else if (route.name === 'Cadastro') {
              iconName = 'clipboard-outline';
            } else if (route.name === 'Contato') {
              iconName = 'call-outline';
            } else if (route.name === 'Participantes') {
              iconName = 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff914d',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: styles.tabBar, // Estilização da barra
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pets" component={PetsScreen} />
        <Tab.Screen name="Cadastro" component={CadastroScreen} />
        <Tab.Screen name="Contato" component={ContatoScreen} />
        <Tab.Screen name="Participantes" component={ParticipantesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80, // Altura do header
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ff914d",
   // Cor de fundo do header (igual ao fundo da tela)
    paddingTop: 30, // Ajuste para espaçamento no topo
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  tabBar: {
    width: "90%",
    alignSelf: "center", 
    
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    backgroundColor: '#f8f3ee', 
    height: 60,
    bottom: 10,
    justifyContent: "center", 
    alignItems: "center", 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});
