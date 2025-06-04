import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../components/InputTemplate";
import VStack from "../../components/Stacks/VStack";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusBar from "../../components/StatusBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import DataPickerButton from "../../components/DataPicker";

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

export default function CadastroDados() {
  const [name, setName] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios" ? true : false);
    setDate(currentDate);
    setDataNascimento(currentDate.toLocaleDateString());
  };

  const handleConfirmDate = () => {
    setShow(false); // Fechar o modal quando o usuário confirmar
  };

  return (
    <>
      <CustomStatusBar backgroundColor="#83239F" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <CustomBackButton />
        <VStack style={styles.vStack}>
          <ScrollView style={styles.scrollContainer}>
            <Text variant="headlineMedium" style={styles.title}>
              Preencha os dados para criar a sua conta.
            </Text>
            <MyTextInput
              label="Nome completo"
              value={name}
              onChangeText={setName}
              icon="account-circle"
            />

            <MyTextInput
              label="Telefone"
              value={phone}
              onChangeText={setPhone}
              icon="phone"
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={showDatepicker}>
              <DataPickerButton
                label="Data de nascimento"
                value={dataNascimento}
                icon="event"
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            
          </ScrollView>
          {show && (
              <Animatable.View
                animation="fadeInUp"
                style={styles.datePickerModal}
              >
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onChangeDate}
                  locale="pt-BR"
                />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmDate}
                >
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
        </VStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  vStack: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    width: "100%",
    paddingBottom: 100, // Evita que o conteúdo seja sobreposto pelo modal
  },
  title: {
    color: "#000",
    marginBottom: 20,
    fontSize: 22,
  },
  backButton: {
    left: 10,
    zIndex: 1,
    position: "absolute",
    top: 10,
  },
  datePickerModal: {
    position: "absolute",
    bottom: -20, 
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confirmButton: {
    backgroundColor: "#83239F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
