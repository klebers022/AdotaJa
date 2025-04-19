import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Picker, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function CadastroScreen() {
  const [pet, setPet] = useState({
    nome: '',
    idade: '',
    porte: '',
    tipo: '',
    localizacao: '',
    descricao: '',
    imagem: pet
  });

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result)
    if (!result.cancelled) {
    
      setPet({ ...pet, imagem: result.assets[0].uri });
    }
  };

  const cadastrarPet = async () => {
    try {
      await axios.post("http://192.168.1.128:5000/pets", pet);
      alert('Pet cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar pet.');
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastre seu Pet</Text>

      {/* Preview */}
      <TouchableOpacity style={styles.uploadBox} onPress={escolherImagem}>
        {pet.imagem ? (
          <Image source={{ uri: pet.imagem }} style={styles.imagem} />
        ) : (
          <Text style={styles.uploadTexto}>Adicionar foto</Text>
        )}
      </TouchableOpacity>

      {/* Form */}
      <Text style={styles.label}>Nome do Pet</Text>
      <TextInput style={styles.input} placeholder="Ex: Luna" value={pet.nome} onChangeText={text => setPet({ ...pet, nome: text })} />

      <View style={styles.linha}>
        <View style={styles.metade}>
          <Text style={styles.label}>Idade</Text>
          <TextInput style={styles.input} placeholder="Ex: 4 anos" value={pet.idade} onChangeText={text => setPet({ ...pet, idade: text })} />
        </View>
        <View style={styles.metade}>
          <Text style={styles.label}>Porte</Text>
          <TextInput style={styles.input} placeholder="Ex: Pequeno" value={pet.porte} onChangeText={text => setPet({ ...pet, porte: text })} />
        </View>
      </View>

      <View style={styles.linha}>
        <View style={styles.metade}>
          <Text style={styles.label}>Localização</Text>
          <TextInput style={styles.input} placeholder="Cidade, Estado" value={pet.localizacao} onChangeText={text => setPet({ ...pet, localizacao: text })} />
        </View>
        <View style={styles.metade}>
          <Text style={styles.label}>Tipo</Text>
          <TextInput style={styles.input} value={pet.tipo} placeholder='Cachorro/Gato' onChangeText={text => setPet({ ...pet, tipo: text })} />
        </View>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} placeholder="Conte um pouco sobre o Pet.." value={pet.descricao} onChangeText={text => setPet({ ...pet, descricao: text })} />

      <TouchableOpacity style={styles.botao} onPress={cadastrarPet}>
        <Text style={styles.botaoTexto}>Cadastrar Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7EFE7',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F27F38',
    marginBottom: 15,
  },
  uploadBox: {
    backgroundColor: '#F0EAEA',
    height: 140,
    borderWidth: 1,
    borderColor: '#A68CB7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadTexto: {
    color: '#6A4FB3',
    fontWeight: '600'
  },
  imagem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  label: {
    color: '#F27F38',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A68CB7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metade: {
    flex: 0.48,
  },
  botao: {
    backgroundColor: '#F27F38',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
