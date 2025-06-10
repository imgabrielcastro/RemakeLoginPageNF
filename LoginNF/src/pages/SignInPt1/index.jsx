import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../components/InputTemplate";
import VStack from "../../components/Stacks/VStack";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Animatable from "react-native-animatable";
import DataPickerButton from "../../components/DataPicker";
import GenderPicker from "../../components/SelectGender";
import PhoneInput from "../../components/PhoneInput";
import TittleInput from "../../components/TittleInput";
import CpfInput from "../../components/CpfInput";
import StepIndicator from "../../components/StepIndicator";

const CadastroDados = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState("");
  const [sexModalVisible, setSexModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNextPress = () =>{
    navigation.navigate("SignIn2");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Cadastro",
      headerStyle: {
        backgroundColor: "#83239F",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={{ marginBottom: 4 }}>
          <Icon name="chevron-left" size={32} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setSexModalVisible(false);
        setDateModalVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const showSexpicker = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setSexModalVisible(true);
      setDateModalVisible(false);
    }, 100);
  };

  const setSexMasc = () => {
    setGender("Masculino");
    setSexModalVisible(false);
  };

  const setSexFem = () => {
    setGender("Feminino");
    setSexModalVisible(false);
  };

  const showDatepicker = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setDateModalVisible(true);
      setSexModalVisible(false);
    }, 100);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const handleConfirmDate = () => {
    if (tempDate > new Date()) {
      Alert.alert(
        "Erro",
        "A data de nascimento não pode ser maior que a data atual."
      );
      setTempDate(new Date());
      setDataNascimento("");
      setDateModalVisible(false);
      return;
    }

    setShow(Platform.OS === "ios");
    setDate(tempDate);
    setDataNascimento(tempDate.toLocaleDateString("pt-BR"));
    setDateModalVisible(false);
  };

  const closeModalIfClickedOutside = () => {
    if (sexModalVisible) setSexModalVisible(false);
    if (dateModalVisible) setDateModalVisible(false);
  };

  const modalIsOpen = sexModalVisible || dateModalVisible;

  return (
    <>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#fafafa", flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, position: "relative" }}>
          {modalIsOpen && (
            <TouchableWithoutFeedback onPress={closeModalIfClickedOutside}>
              <View style={styles.modalOverlay} pointerEvents="auto" />
            </TouchableWithoutFeedback>
          )}

          <VStack style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={!modalIsOpen}
              showsVerticalScrollIndicator={true}
            >
              <Text variant="headlineMedium" style={styles.title}>
                Preencha os dados para criar a sua conta.
              </Text>

              <TittleInput label="Nome completo" />
              <MyTextInput
                value={name}
                onChangeText={setName}
                icon="account-circle"
                maxLength={39}
                editable={!modalIsOpen}
              />

              <TittleInput label="Data de Nascimento" />
              <TouchableOpacity onPress={showDatepicker} disabled={modalIsOpen}>
                <DataPickerButton
                  value={dataNascimento}
                  icon="event"
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              <TittleInput label="Sexo" />
              <TouchableOpacity onPress={showSexpicker} disabled={modalIsOpen}>
                <GenderPicker
                  value={gender}
                  onValueChange={setSex}
                  icon="venus-mars"
                />
              </TouchableOpacity>

              <TittleInput label="E-mail *" />
              <MyTextInput
                value={email}
                onChangeText={setEmail}
                icon="mail"
                maxLength={39}
                editable={!modalIsOpen}
              />

              <TittleInput label="Telefone" />
              <PhoneInput
                value={phone}
                onChangeText={setPhone}
                icon="phone"
                keyboardType="numeric"
                mask="(99) 99999-9999"
                editable={!modalIsOpen}
                maxLength={15}
              />

              <TittleInput label="CPF" />
              <CpfInput
                value={cpf}
                onChangeText={setCpf}
                icon="person"
                keyboardType="numeric"
                mask="111.111.111-11"
                editable={!modalIsOpen}
                maxLength={14}
              />
              

            </ScrollView>
            <VStack style={{ padding: 16, paddingBottom: "15%", gap: 12 }}>
              <StepIndicator currentStep={1} totalSteps={3}/>
              <TouchableOpacity
                style={{
                  backgroundColor: "#83239F",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  
                }}
                onPress={handleNextPress}
              >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "transparent",
                  color: "#83239F",
                  borderWidth: 2,
                  borderColor: "#83239F",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleBackPress}
              >
                <Text
                  style={{ color: "#83239F", fontSize: 16, fontWeight: "bold" }}
                >
                  Voltar
                </Text>
              </TouchableOpacity> */}
            </VStack>
          </VStack>

          {/* Modal Data */}
          {dateModalVisible && (
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animatable.View
                animation="fadeInUp"
                style={styles.datePickerModal}
                pointerEvents="auto"
              >
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={onChangeDate}
                  locale="pt-BR"
                />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmDate}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                      fontWeight: "bold",
                      padding: 8,
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </TouchableWithoutFeedback>
          )}

          {sexModalVisible && (
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animatable.View
                animation="fadeInUp"
                style={styles.datePickerModal}
                pointerEvents="auto"
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#83239F",
                    borderRadius: 12,
                    paddingVertical: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={setSexMasc}
                >
                  <Text style={styles.buttonTextGender}>Masculino</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor: "#83239F",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",}}
                  onPress={setSexFem}
                >
                  <Text style={styles.buttonTextGender}>Feminino</Text>
                </TouchableOpacity>
              </Animatable.View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
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
    gap: 12,
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
    zIndex: 30,
    paddingBottom: 50,
  },
  confirmButton: {
    backgroundColor: "#83239F",
    padding: 0,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 10,
  },
  buttonTextGender: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CadastroDados;
