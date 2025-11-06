import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

export default function HomeScreen({ navigation }) {
  const features = [
    {
      title: "Encontre um pet:",
      text:
        "Veja perfis de animais disponíveis para adoção, filtrando por tamanho, idade e localização.",
    },
    {
      title: "Converse com responsáveis:",
      text: "Tire dúvidas e conheça a história do pet antes de adotá-lo.",
    },
    {
      title: "Processo seguro:",
      text:
        "Garantimos um processo de adoção responsável, priorizando o bem-estar dos animais.",
    },
    {
      title: "Acompanhamento pós-adoção:",
      text:
        "Receba suporte e dicas para garantir que seu novo amigo se adapte bem ao lar.",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Título + descrição com fade/slide */}
      <MotiView
        from={{ opacity: 0, translateY: 18 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
      >
        <Text style={styles.title}>Bem-vindo ao AdotaJá!</Text>
        <Text style={styles.description}>
          O AdotaJá é um aplicativo criado para facilitar a adoção responsável de pets.
          Conectamos ONGs, protetores e lares temporários a pessoas que desejam oferecer um
          lar amoroso para animais abandonados.
        </Text>
      </MotiView>

      {/* Subtítulo */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 350, delay: 120 }}
      >
        <Text style={styles.subtitle}>Como Funciona?</Text>
      </MotiView>

      {/* Lista com STAGGER (cada bloco entra em sequência) */}
      {features.map((item, index) => (
        <MotiView
          key={index}
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 280,
            delay: 150 + index * 90,
          }}
          style={{ marginBottom: 10 }}
        >
          <Text style={styles.highlight}>
            {item.title} <Text style={styles.normalText}>{item.text}</Text>
          </Text>
        </MotiView>
      ))}

      {/* Botão ADOTE JÁ com imagem animada e feedback de toque */}
      <View style={styles.buttonContainer}>
        {/* Cachorro “flutuando” de leve */}
        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: -6 }}
          transition={{
            type: "timing",
            duration: 1200,
            loop: true,
            repeatReverse: true,
          }}
          style={{ zIndex: 1, marginBottom: -36 }}
        >
          <Image source={require("../assets/cachorro.png")} style={styles.dogImage} />
        </MotiView>

        <MotiPressable
          onPress={() => navigation.navigate("Drawer")}
          animate={({ pressed }) => {
            "worklet";
            return {
              scale: pressed ? 0.97 : 1,
              opacity: pressed ? 0.9 : 1,
            };
          }}
          transition={{ type: "timing", duration: 120 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ADOTE JÁ</Text>
        </MotiPressable>
      </View>
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
  },
  button: {
    backgroundColor: "#ff914d",
    paddingVertical: 12,
    paddingHorizontal: 34,
    borderRadius: 30,
    zIndex: 0,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
