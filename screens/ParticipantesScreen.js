import React from "react";
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ParticipantesScreen() {
  const participantes = [
    {
      nome: "Kleber da Silva",
      img: require("../assets/kleber.png"),
      rm: "RM: 557887",
      github: "https://github.com/klebers022",
      linkedin: "https://linkedin.com/in/kleber-silva"
    },
    {
      nome: "Lucas Rainha",
      img: require("../assets/lucas.png"),
      rm: "RM: 558471",
      github: "https://github.com/lucasrainha",
      linkedin: "https://linkedin.com/in/lucasrainha"
    },
    {
      nome: "Nicolas Barutti",
      img: require("../assets/nicolas.jpg"),
      rm: "RM: 558471",
      github: "https://github.com/nicolasbarutti",
      linkedin: "https://linkedin.com/in/nicolasbarutti"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {participantes.map((p, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={p.img}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.nome}>{p.nome}</Text>
            <Text style={styles.rm}>{p.rm}</Text>
            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => Linking.openURL(p.github)}
              >
                <Ionicons name="logo-github" size={16} color="#fff" />
                <Text style={styles.botaoTexto}>GITHUB</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, { backgroundColor: "#0A66C2" }]}
                onPress={() => Linking.openURL(p.linkedin)}
              >
                <Ionicons name="logo-linkedin" size={16} color="#fff" />
                <Text style={styles.botaoTexto}>LINKEDIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2ebe5", 
    padding: 16
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "cover"
  },
  info: {
    alignItems: "flex-start"
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000"
  },
  rm: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10
  },
  botoes: {
    flexDirection: "row",
    gap: 10
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF914D", 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10
  },
  botaoTexto: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "600"
  }
});
