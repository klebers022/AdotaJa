import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";

export default function ContatoScreen() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleEnviar = () => {
    
    alert("Mensagem enviada com sucesso!");
    setEmail("");
    setMensagem("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Entre em Contato com o AdotaJá!</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <FontAwesome name="phone" size={20} color="#005f99" />
          <Text style={styles.infoText}>(11) 91234-5678</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="email" size={20} color="#005f99" />
          <Text style={styles.infoText}>contato@adotaja.org.br</Text>
        </View>

        <View style={styles.infoItem}>
          <Feather name="instagram" size={20} color="#005f99" />
          <Text style={styles.infoText}>@adotaja.oficial</Text>
        </View>
      </View>

      <Image source={require("../assets/caontato-animed.png")} style={styles.image} />

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Mensagem</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite sua mensagem"
          multiline
          numberOfLines={4}
          value={mensagem}
          onChangeText={setMensagem}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff7b00",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 0,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#ff7b00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
