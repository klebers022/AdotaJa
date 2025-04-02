import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 24, color: "#5E60CE", fontWeight: "bold" }}>
        Bem-vindo ao AdotaJá!
      </Text>
      <Text style={{ color: "#33333" }}>
        O AdotaJá é um aplicativo criado para facilitar a adoção responsável de
        pets. Conectamos ONGs, protetores e lares temporários a pessoas que
        desejam oferecer um lar amoroso para animais abandonados.
      </Text>

      <Text style={{ fontSize: 24, color: "#5E60CE", fontWeight: "bold" }}>
        Como Funciona?
      </Text>
      <Text style={{ color: "#ff914d", fontWeight:'bold'  }}>
        Encontre um pet:
        <Text style={{ color: "#333333", fontWeight:'regular'}}>
          Veja perfis de animais disponíveis para adoção, filtrando por tamanho,
          idade e localização.
        </Text>
      </Text>

      <Text style={{ color: "#ff914d", fontWeight:'bold' }}>
        Converse com responsáveis: 
        <Text style={{ color: "#333333", fontWeight:'regular'}}>
        Tire dúvidas e conheça a história do pet antes de adotá-lo.
        </Text>
      </Text>

      <Text style={{ color: "#ff914d", fontWeight:'bold' }}>
      Processo seguro:  
        <Text style={{ color: "#333333", fontWeight:'regular' }}>
        Garantimos um processo de adoção responsável, priorizando o bem-estar dos animais.
        </Text>
      </Text>

      <Text style={{ color: "#ff914d", fontWeight:'bold' }}>
      Acompanhamento pós-adoção:  
        <Text style={{ color: "#333333", fontWeight:'regular' }}>
        Receba suporte e dicas para garantir que seu novo amigo se adapte bem ao lar.
        </Text>
      </Text>
    </View>
  );
}
