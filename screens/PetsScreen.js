import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function PetsScreen() {
  const [pets, setPets] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');

  const buscarPets = async () => {
    try {
      const response = await axios.get("http://192.168.10.2125000/pets");
      setPets(response.data.data);

      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
    }
  };

  useEffect(() => {
    buscarPets();
  }, []);

  const filtrarPets = () => {
    return pets.filter(pet =>
      (!filtro || pet.tipo.toLowerCase() === filtro.toLowerCase()) &&
      (!busca || pet.nome.toLowerCase().includes(busca.toLowerCase()))
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
          onSubmitEditing={buscarPets}
        />
        <Ionicons name="options-outline" size={24} color="#6A5ACD" />
      </View>

      <View style={styles.filtros}>
        {['Cachorro', 'Gato'].map(tipo => (
          <TouchableOpacity
            key={tipo}
            style={[styles.botaoFiltro, filtro === tipo && styles.botaoSelecionado]}
            onPress={() => setFiltro(filtro === tipo ? '' : tipo)}
          >
            <Text style={styles.textoFiltro}>{tipo}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtrarPets()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imagem }} style={styles.imagem} />
          <View style={styles.info}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.detalhes}>{item.idade} - {item.porte}</Text>
            <Text style={styles.localizacao}>📍 {item.localizacao}</Text>
            <TouchableOpacity style={styles.botaoAdotar}>
              <Text style={styles.textoBotao}>Adote já</Text>
            </TouchableOpacity>
          </View>
        </View>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f0ea',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff7a30',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#a9a9f5',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  filtros: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  botaoFiltro: {
    backgroundColor: '#dcdcdc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  botaoSelecionado: {
    backgroundColor: '#7b73d1',
  },
  textoFiltro: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imagem: {
    width: '100%',
    height: 140,
  },
  info: {
    padding: 12,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detalhes: {
    color: '#555',
  },
  localizacao: {
    color: '#888',
    marginBottom: 8,
  },
  botaoAdotar: {
    backgroundColor: '#ff7a30',
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
