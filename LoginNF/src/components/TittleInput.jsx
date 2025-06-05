import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TittleInput({ label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, // Espaço entre a label e o input
  },
  label: {
    fontSize: 12, // Tamanho pequeno para a label
    color: "#83239F", // Cor do texto conforme o projeto
    fontWeight: "bold", // Deixar o texto em negrito para destaque
  },
});
