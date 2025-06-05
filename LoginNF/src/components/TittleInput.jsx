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
    marginBottom: 7, 
  },
  label: {
    fontSize: 13, 
    color: "#83239F", 
    fontWeight: "bold", 
  },
});
