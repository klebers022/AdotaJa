import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

const API = "http://192.168.1.128:5000/pets";

export default function PetsScreen() {
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState("");

  const buscarPets = useCallback(async () => {
    try {
      setErro("");
      setLoading(true);
      const response = await axios.get(API);
      // adapta para diferentes formatos de resposta
      const data = response?.data?.data ?? response?.data ?? [];
      setPets(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Erro ao buscar pets:", e?.message);
      setErro("Não foi possível carregar os pets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscarPets();
  }, [buscarPets]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await buscarPets();
    setRefreshing(false);
  }, [buscarPets]);

  const listaFiltrada = useMemo(() => {
    const q = (busca || "").toLowerCase();
    const f = (filtro || "").toLowerCase();
    return pets.filter((p) => {
      const tipoOk = !f || (p?.tipo || "").toLowerCase() === f;
      const buscaOk = !q || (p?.nome || "").toLowerCase().includes(q);
      return tipoOk && buscaOk;
    });
  }, [pets, filtro, busca]);

  const renderItem = ({ item, index }) => {
    const uri = item?.imagem || item?.foto || null; // fallback de campo
    return (
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 280, delay: 70 * index }}
        style={styles.card}
      >
        <MotiView
          from={{ opacity: 0.85, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 250, delay: 70 * index }}
        >
          <Image
            source={
              uri
                ? { uri }
                : require("../assets/cachorro.png") // placeholder local
            }
            style={styles.imagem}
          />
        </MotiView>

        <View style={styles.info}>
          <Text style={styles.nome}>{item?.nome ?? "Pet"}</Text>
          <Text style={styles.detalhes}>
            {(item?.idade ?? "Idade n/d")} - {(item?.porte ?? "Porte n/d")}
          </Text>
          <Text style={styles.localizacao}>
            📍 {item?.localizacao ?? "Local não informado"}
          </Text>

          <MotiPressable
            onPress={() => navigation.navigate("PetDetalhe", { pet: item })}
            animate={({ pressed }) => {
              "worklet";
              return { scale: pressed ? 0.97 : 1, opacity: pressed ? 0.9 : 1 };
            }}
            transition={{ type: "timing", duration: 120 }}
            style={styles.botaoAdotar}
          >
            <Text style={styles.textoBotao}>Adote já</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color="#fff"
              style={{ marginLeft: 6 }}
            />
          </MotiPressable>
        </View>
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Encontre seu novo amigo!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar pets..."
          value={busca}
          onChangeText={setBusca}
          returnKeyType="search"
        />
        <Ionicons name="search-outline" size={22} color="#6A5ACD" />
      </View>

      <View style={styles.filtros}>
        {["Cachorro", "Gato"].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[styles.botaoFiltro, filtro === tipo && styles.botaoSelecionado]}
            onPress={() => setFiltro(filtro === tipo ? "" : tipo)}
          >
            <Text style={styles.textoFiltro}>{tipo}</Text>
          </TouchableOpacity>
        ))}
        {filtro ? (
          <TouchableOpacity onPress={() => setFiltro("")}>
            <Text style={styles.limparFiltro}>Limpar</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#ff7a30" />
          <Text style={{ marginTop: 8, color: "#777" }}>Carregando pets...</Text>
        </View>
      ) : erro ? (
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Text style={{ color: "#c00", fontWeight: "600" }}>{erro}</Text>
          <TouchableOpacity style={[styles.botaoFiltro, { marginTop: 10 }]} onPress={buscarPets}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={listaFiltrada}
          keyExtractor={(item, i) =>
            (item?.id != null ? String(item.id) : `${item?.nome ?? "pet"}-${i}`)
          }
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "timing", duration: 250 }}
              style={{ alignItems: "center", marginTop: 32 }}
            >
              <Ionicons name="sad-outline" size={28} color="#999" />
              <Text style={{ color: "#999", marginTop: 6 }}>
                Nenhum pet encontrado para esses filtros.
              </Text>
            </MotiView>
          }
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f0ea",
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff7a30",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#a9a9f5",
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  filtros: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  botaoFiltro: {
    backgroundColor: "#dcdcdc",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  botaoSelecionado: {
    backgroundColor: "#7b73d1",
  },
  limparFiltro: {
    color: "#7b73d1",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imagem: {
    width: "100%",
    height: 140,
  },
  info: {
    padding: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detalhes: {
    color: "#555",
  },
  localizacao: {
    color: "#888",
    marginBottom: 8,
  },
  botaoAdotar: {
    backgroundColor: "#ff7a30",
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
