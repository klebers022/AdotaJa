import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

export default function CadastroScreen() {
  const [pet, setPet] = useState({
    nome: "",
    idade: "",
    porte: "",
    tipo: "",
    localizacao: "",
    descricao: "",
    imagem: null, // ✅ corrigido
  });
  const [focusField, setFocusField] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const escolherImagem = async () => {
    // solicite permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria é necessária.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ correto
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // novas versões usam "canceled"
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPet((prev) => ({ ...prev, imagem: result.assets[0].uri }));
    }
  };

  const validar = () => {
    if (!pet.nome || !pet.tipo || !pet.localizacao) {
      alert("Preencha pelo menos: Nome, Tipo e Localização.");
      return false;
    }
    return true;
  };

  const cadastrarPet = async () => {
    if (!validar()) return;
    try {
      setSending(true);

      // Se o seu backend aceitar JSON com a URI local, isto já resolve:
      await axios.post("http://192.168.1.128:5000/pets", pet);

      // (Opcional) Caso precise multipart/form-data, me avise que envio a versão com FormData.
      setSent(true);
      alert("Pet cadastrado com sucesso!");
      setPet({
        nome: "",
        idade: "",
        porte: "",
        tipo: "",
        localizacao: "",
        descricao: "",
        imagem: null,
      });
      setTimeout(() => setSent(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar pet.");
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F7EFE7" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 350 }}
        >
          <Text style={styles.titulo}>Cadastre seu Pet</Text>
        </MotiView>

        {/* Preview / Upload */}
        <MotiPressable
          onPress={escolherImagem}
          animate={({ pressed }) => {
            "worklet";
            return {
              scale: pressed ? 0.98 : 1,
              opacity: pressed ? 0.95 : 1,
            };
          }}
          style={styles.uploadBox}
        >
          {pet.imagem ? (
            <Image source={{ uri: pet.imagem }} style={styles.imagem} />
          ) : (
            <Text style={styles.uploadTexto}>Adicionar foto</Text>
          )}
        </MotiPressable>

        {/* Form - Nome */}
        <Text style={styles.label}>Nome do Pet</Text>
        <MotiView
          animate={{
            borderColor: focusField === "nome" ? "#F27F38" : "transparent",
            shadowOpacity: focusField === "nome" ? 0.12 : 0,
            scale: focusField === "nome" ? 1.005 : 1,
          }}
          transition={{ type: "timing", duration: 150 }}
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Ex: Luna"
            value={pet.nome}
            onChangeText={(text) => setPet({ ...pet, nome: text })}
            onFocus={() => setFocusField("nome")}
            onBlur={() => setFocusField(null)}
          />
        </MotiView>

        {/* Linha 1: Idade / Porte */}
        <View style={styles.linha}>
          <View style={styles.metade}>
            <Text style={styles.label}>Idade</Text>
            <MotiView
              animate={{
                borderColor: focusField === "idade" ? "#F27F38" : "transparent",
                shadowOpacity: focusField === "idade" ? 0.12 : 0,
                scale: focusField === "idade" ? 1.005 : 1,
              }}
              transition={{ type: "timing", duration: 150 }}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                placeholder="Ex: 4 anos"
                value={pet.idade}
                onChangeText={(text) => setPet({ ...pet, idade: text })}
                onFocus={() => setFocusField("idade")}
                onBlur={() => setFocusField(null)}
              />
            </MotiView>
          </View>

          <View style={styles.metade}>
            <Text style={styles.label}>Porte</Text>
            <MotiView
              animate={{
                borderColor: focusField === "porte" ? "#F27F38" : "transparent",
                shadowOpacity: focusField === "porte" ? 0.12 : 0,
                scale: focusField === "porte" ? 1.005 : 1,
              }}
              transition={{ type: "timing", duration: 150 }}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                placeholder="Ex: Pequeno"
                value={pet.porte}
                onChangeText={(text) => setPet({ ...pet, porte: text })}
                onFocus={() => setFocusField("porte")}
                onBlur={() => setFocusField(null)}
              />
            </MotiView>
          </View>
        </View>

        {/* Linha 2: Localização / Tipo */}
        <View style={styles.linha}>
          <View style={styles.metade}>
            <Text style={styles.label}>Localização</Text>
            <MotiView
              animate={{
                borderColor: focusField === "localizacao" ? "#F27F38" : "transparent",
                shadowOpacity: focusField === "localizacao" ? 0.12 : 0,
                scale: focusField === "localizacao" ? 1.005 : 1,
              }}
              transition={{ type: "timing", duration: 150 }}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                placeholder="Cidade, Estado"
                value={pet.localizacao}
                onChangeText={(text) => setPet({ ...pet, localizacao: text })}
                onFocus={() => setFocusField("localizacao")}
                onBlur={() => setFocusField(null)}
              />
            </MotiView>
          </View>

          <View style={styles.metade}>
            <Text style={styles.label}>Tipo</Text>
            <MotiView
              animate={{
                borderColor: focusField === "tipo" ? "#F27F38" : "transparent",
                shadowOpacity: focusField === "tipo" ? 0.12 : 0,
                scale: focusField === "tipo" ? 1.005 : 1,
              }}
              transition={{ type: "timing", duration: 150 }}
              style={styles.inputWrapper}
            >
              <TextInput
                style={styles.input}
                placeholder="Cachorro / Gato"
                value={pet.tipo}
                onChangeText={(text) => setPet({ ...pet, tipo: text })}
                onFocus={() => setFocusField("tipo")}
                onBlur={() => setFocusField(null)}
              />
            </MotiView>
          </View>
        </View>

        {/* Descrição */}
        <Text style={styles.label}>Descrição</Text>
        <MotiView
          animate={{
            borderColor: focusField === "descricao" ? "#F27F38" : "transparent",
            shadowOpacity: focusField === "descricao" ? 0.12 : 0,
            scale: focusField === "descricao" ? 1.005 : 1,
          }}
          transition={{ type: "timing", duration: 150 }}
          style={[styles.inputWrapper, { borderRadius: 10 }]}
        >
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte um pouco sobre o Pet.."
            value={pet.descricao}
            onChangeText={(text) => setPet({ ...pet, descricao: text })}
            onFocus={() => setFocusField("descricao")}
            onBlur={() => setFocusField(null)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </MotiView>

        {/* Botão */}
        <MotiPressable
          onPress={cadastrarPet}
          disabled={sending}
          animate={({ pressed }) => {
            "worklet";
            return {
              scale: pressed ? 0.98 : 1,
              opacity: sending ? 0.6 : pressed ? 0.9 : 1,
            };
          }}
          transition={{ type: "timing", duration: 120 }}
          style={styles.botao}
        >
          <Text style={styles.botaoTexto}>
            {sending ? "Cadastrando..." : "Cadastrar Pet"}
          </Text>
        </MotiPressable>

        {/* Banner simples de sucesso */}
        {sent && (
          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 250 }}
            style={styles.sucesso}
          >
            <Text style={styles.sucessoTexto}>Pet cadastrado com sucesso! 🎉</Text>
          </MotiView>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 36,
    backgroundColor: "#F7EFE7",
    flexGrow: 1,
    gap: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F27F38",
    marginBottom: 15,
  },
  uploadBox: {
    backgroundColor: "#F0EAEA",
    height: 140,
    borderWidth: 1,
    borderColor: "#A68CB7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    overflow: "hidden",
  },
  uploadTexto: {
    color: "#6A4FB3",
    fontWeight: "600",
  },
  imagem: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  label: {
    color: "#F27F38",
    fontWeight: "bold",
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
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A68CB7",
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
    color: "#222",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 110,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  metade: {
    flex: 0.5,
  },
  botao: {
    backgroundColor: "#F27F38",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.4,
  },
  sucesso: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 12,
    alignSelf: "center",
    elevation: 2,
  },
  sucessoTexto: {
    color: "#0e7a0d",
    fontWeight: "600",
  },
});
