import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao AdotaJá!</Text>

      <Text style={styles.description}>
        O AdotaJá é um aplicativo criado para facilitar a adoção responsável de pets. Conectamos ONGs, protetores e lares temporários a pessoas que desejam oferecer um lar amoroso para animais abandonados.
      </Text>

      <Text style={styles.subtitle}>Como Funciona?</Text>

      <Text style={styles.highlight}>
        Encontre um pet: <Text style={styles.normalText}>Veja perfis de animais disponíveis para adoção, filtrando por tamanho, idade e localização.</Text>
      </Text>

      <Text style={styles.highlight}>
        Converse com responsáveis: <Text style={styles.normalText}>Tire dúvidas e conheça a história do pet antes de adotá-lo.</Text>
      </Text>

      <Text style={styles.highlight}>
        Processo seguro: <Text style={styles.normalText}>Garantimos um processo de adoção responsável, priorizando o bem-estar dos animais.</Text>
      </Text>

      <Text style={styles.highlight}>
        Acompanhamento pós-adoção: <Text style={styles.normalText}>Receba suporte e dicas para garantir que seu novo amigo se adapte bem ao lar.</Text>
      </Text>

      
      <TouchableOpacity style={styles.buttonContainer} >
        <Image
          source={require('../assets/cachorro.png')} 
          style={styles.dogImage}
        />
        <View style={styles.button}>
          <Text style={styles.buttonText}>ADOTE JÁ</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff914d",
    marginBottom: 10,
  },
  description: {
    color: "#333",
    fontSize: 14,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff914d",
    marginTop: 10,
    marginBottom: 15,
  },
  highlight: {
    color: "#5E60CE",
    fontWeight: "bold",
    marginBottom: 10,
  },
  normalText: {
    color: "#333333",
    fontWeight: "normal",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  dogImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: -36,
    zIndex: 1,
  },
  button: {
    backgroundColor: "#ff914d",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    zIndex: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
