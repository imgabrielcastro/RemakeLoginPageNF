import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native"; // Importação do TouchableOpacity
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Importação do useNavigation
import MyTextInput from "../../components/InputTemplate";
import VStack from "../../components/Stacks/VStack";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/StatusBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomBackButton = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Welcome");
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
      <Icon name="chevron-left" size={30} color="black" />
    </TouchableOpacity>
  );
};

const showDatepicker = () => {
  setShowModal(true); 
};

export default function CadastroDados() {
  const [name, setName] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <>
      <CustomStatusBar backgroundColor="#83239F" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <CustomBackButton />
        <VStack style={{ padding: 16, bottom: 30 }}>
          <ScrollView style={styles.contain}>
            <Text variant="headlineMedium" style={styles.title}>
              Preencha os dados para criar a sua conta.
            </Text>
            <MyTextInput
              label="Nome completo"
              value={name}
              onChangeText={setName}
              icon="account-circle"
            />
            <MyTextInput label="Data de nascimento" value={date} icon="event" />
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
            />

            <MyTextInput
              label="Telefone"
              value={phone}
              onChangeText={setPhone}
              icon="phone"
              keyboardType="numeric"
            />

            <MyTextInput
              label="Nome completo"
              value={name}
              onChangeText={setName}
              icon="account-circle"
            />
          </ScrollView>
        </VStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  title: {
    color: "#000",
    marginBottom: 20,
  },
  backButton: {
    left: 10,
    zIndex: 1,
    position: "absolute",
    top: 10,
  },
  contain: {
    width: "100%",
    height: "100%",
  },
});
