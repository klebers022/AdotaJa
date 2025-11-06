import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

export default function ParticipantesScreen() {
  const participantes = [
    {
      nome: "Kleber da Silva",
      img: require("../assets/kleber.png"),
      rm: "RM: 557887",
      github: "https://github.com/klebers022",
      linkedin: "https://linkedin.com/in/kleber-silva",
    },
    {
      nome: "Lucas Rainha",
      img: require("../assets/lucas.png"),
      rm: "RM: 558471",
      github: "https://github.com/lucasrainha",
      linkedin: "https://linkedin.com/in/lucasrainha",
    },
    {
      nome: "Nicolas Barutti",
      img: require("../assets/nicolas.jpg"),
      rm: "RM: 558471",
      github: "https://github.com/nicolasbarutti",
      linkedin: "https://linkedin.com/in/nicolasbarutti",
    },
  ];

  const openLink = async (url) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (ok) Linking.openURL(url);
      else Alert.alert("Link inválido", "Não foi possível abrir o link.");
    } catch {
      Alert.alert("Erro", "Não foi possível abrir o link.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {participantes.map((p, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0, translateY: 14 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 320, delay: 80 * index }}
          style={styles.card}
        >
          <MotiView
            from={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 300, delay: 80 * index }}
          >
            <Image source={p.img} style={styles.image} />
          </MotiView>

          <View style={styles.info}>
            <Text style={styles.nome}>{p.nome}</Text>
            <Text style={styles.rm}>{p.rm}</Text>

            <View style={styles.botoes}>
              <MotiPressable
                onPress={() => openLink(p.github)}
                animate={({ pressed }) => {
                  "worklet";
                  return {
                    scale: pressed ? 0.97 : 1,
                    opacity: pressed ? 0.9 : 1,
                  };
                }}
                transition={{ type: "timing", duration: 120 }}
                style={styles.botao}
              >
                <Ionicons name="logo-github" size={16} color="#fff" />
                <Text style={styles.botaoTexto}>GITHUB</Text>
              </MotiPressable>

              <MotiPressable
                onPress={() => openLink(p.linkedin)}
                animate={({ pressed }) => {
                  "worklet";
                  return {
                    scale: pressed ? 0.97 : 1,
                    opacity: pressed ? 0.9 : 1,
                  };
                }}
                transition={{ type: "timing", duration: 120 }}
                style={[styles.botao, { backgroundColor: "#0A66C2" }]}
              >
                <Ionicons name="logo-linkedin" size={16} color="#fff" />
                <Text style={styles.botaoTexto}>LINKEDIN</Text>
              </MotiPressable>
            </View>
          </View>
        </MotiView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2ebe5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  info: {
    alignItems: "flex-start",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  rm: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  botoes: {
    flexDirection: "row",
    gap: 10,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF914D",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  botaoTexto: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "700",
  },
});
