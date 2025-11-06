// screens/PetDetalheScreen.js
import React from "react";
import { View, Text, Image } from "react-native";
import { MotiView } from "moti";

export default function PetDetalheScreen({ route }) {
  const pet = route?.params?.pet;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 350 }}
        style={{ gap: 12 }}
      >
        {pet?.foto ? (
          <Image
            source={{ uri: pet.foto }}
            style={{ width: "100%", height: 240, borderRadius: 16 }}
          />
        ) : null}
        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          {pet?.nome ?? "Pet"}
        </Text>
        <Text>{pet?.descricao ?? "Sem descrição"}</Text>
      </MotiView>
    </View>
  );
}
