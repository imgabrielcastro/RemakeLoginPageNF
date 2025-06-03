import React, { useState } from "react";
import GradientBackGround from "../../components/GradientBackground";
import { View, StyleSheet } from "react-native";
import MyTextInput from "../../components/InputTemplate";
import LogoScreen from "../../components/LogoScreen";

export default function Welcome() {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <GradientBackGround>
      <LogoScreen></LogoScreen>
      <View style={styles.container}>
        <MyTextInput
          label="Nome Completo"
          value={name}
          onChangeText={setName}
          icon="account-circle"
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
          icon="phone"
        ></MyTextInput>
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
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    marginTop: 0,
  },
});
