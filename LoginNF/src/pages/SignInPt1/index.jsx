import React, { useState } from "react";
import GradientBackGround from "../../components/GradientBackground";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import ImputTemplate from "../../components/InputTemplate";
import MyTextInput from "../../components/InputTemplate";

export default function Welcome() {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <GradientBackGround>
      <View style={styles.container}>
        <MyTextInput
          label="Nome"
          value={name}
          onChangeText={setName}
        ></MyTextInput>
        <MyTextInput
          label="CEP"
          value={cep}
          onChangeText={setCep}
        ></MyTextInput>
        <MyTextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        ></MyTextInput>
        <MyTextInput></MyTextInput>
        <MyTextInput></MyTextInput>
        <MyTextInput></MyTextInput>
        <MyTextInput></MyTextInput>
        <MyTextInput></MyTextInput>
        <MyTextInput></MyTextInput>
      </View>
    </GradientBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    borderRadius: 25,
    color: 'red'
  },
  input: {
    marginBottom: 30,
    borderRadius: 55,
  },
});
