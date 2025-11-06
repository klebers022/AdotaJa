import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

export default function ContatoScreen() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sent, setSent] = useState(false);
  const [focusField, setFocusField] = useState(null); // "email" | "mensagem" | null

  const handleEnviar = () => {
    // sua lógica real de envio iria aqui
    setSent(true);
    setEmail("");
    setMensagem("");

    // oculta o banner depois de 2.2s
    setTimeout(() => setSent(false), 2200);
  };

  const InfoItem = ({ icon, text, index }) => (
    <MotiView
      from={{ opacity: 0, translateY: 8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 280, delay: 150 + index * 90 }}
      style={styles.infoItem}
    >
      {icon}
      <Text style={styles.infoText}>{text}</Text>
    </MotiView>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#ff7b00" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Banner de sucesso (slide/fade) */}
        {sent && (
          <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.successBanner}
          >
            <Text style={styles.successText}>Mensagem enviada com sucesso! 🎉</Text>
          </MotiView>
        )}

        {/* Título */}
        <MotiView
          from={{ opacity: 0, translateY: 18 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
        >
          <Text style={styles.title}>Entre em Contato com o AdotaJá!</Text>
        </MotiView>

        {/* Bloco de informações com STAGGER */}
        <View style={styles.infoContainer}>
          <InfoItem
            index={0}
            icon={<FontAwesome name="phone" size={20} color="#005f99" />}
            text="(11) 91234-5678"
          />
          <InfoItem
            index={1}
            icon={<MaterialIcons name="email" size={20} color="#005f99" />}
            text="contato@adotaja.org.br"
          />
          <InfoItem
            index={2}
            icon={<Feather name="instagram" size={20} color="#005f99" />}
            text="@adotaja.oficial"
          />
        </View>

        {/* Imagem “flutuando” */}
        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: -6 }}
          transition={{ type: "timing", duration: 1200, loop: true, repeatReverse: true }}
          style={{ alignSelf: "center", marginBottom: 0 }}
        >
          <Image source={require("../assets/caontato-animed.png")} style={styles.image} />
        </MotiView>

        {/* Formulário com microinterações */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 320, delay: 150 }}
          style={styles.form}
        >
          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <MotiView
            animate={{
              borderColor: focusField === "email" ? "#ff7b00" : "transparent",
              shadowOpacity: focusField === "email" ? 0.15 : 0,
              scale: focusField === "email" ? 1.01 : 1,
            }}
            transition={{ type: "timing", duration: 180 }}
            style={styles.inputWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </MotiView>

          {/* Mensagem */}
          <Text style={styles.label}>Mensagem</Text>
          <MotiView
            animate={{
              borderColor: focusField === "mensagem" ? "#ff7b00" : "transparent",
              shadowOpacity: focusField === "mensagem" ? 0.15 : 0,
              scale: focusField === "mensagem" ? 1.01 : 1,
            }}
            transition={{ type: "timing", duration: 180 }}
            style={[styles.inputWrapper, { borderRadius: 10 }]}
          >
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Digite sua mensagem"
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={mensagem}
              onChangeText={setMensagem}
              onFocus={() => setFocusField("mensagem")}
              onBlur={() => setFocusField(null)}
              textAlignVertical="top"
            />
          </MotiView>

          {/* Botão animado */}
          <MotiPressable
            onPress={handleEnviar}
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
            <Text style={styles.buttonText}>Enviar Mensagem</Text>
          </MotiPressable>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
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
    gap: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    backgroundColor: "transparent",
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    color: "#222",
  },
  textArea: {
    height: 110,
  },
  button: {
    backgroundColor: "#ff7b00",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
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
    letterSpacing: 0.4,
  },
  successBanner: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  successText: {
    color: "#0e7a0d",
    fontWeight: "600",
  },
});
