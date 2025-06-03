import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native"; // Importação do TouchableOpacity
import { BottomNavigation, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Importação do useNavigation
import MyTextInput from "../../components/InputTemplate";
import VStack from "../../components/Stacks/VStack";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/StatusBar";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomBackButton = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Welcome");
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
      <Icon name="chevron-left" size={30} color="black"/>
    </TouchableOpacity>
  );
};

export default function CadastroDados() {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <CustomStatusBar backgroundColor="#83239F" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <CustomBackButton />
        <VStack style={{padding: 16, bottom: 30}}>
            <View style={styles.contain}>
              <Text variant="headlineMedium" style={styles.title}>
                Preencha os dados para criar a sua conta.
              </Text>
              <MyTextInput
                label="Nome Completo"
                value={name}
                onChangeText={setName}
                icon="account-circle"
              />

               <MyTextInput
                label="Telefone"
                value={phone}
                onChangeText={setPhone}
                icon="phone"
              />

            </View>
          </VStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    color: "#000",
    marginBottom: 20,
  },
  backButton: {
    left: 10,
    zIndex: 1,
    position: 'absolute',
    top: 10
  },
});
