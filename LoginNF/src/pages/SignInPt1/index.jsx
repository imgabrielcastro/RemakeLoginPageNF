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
import GenderPicker from "../../components/SelectGender";
import PhoneInput from "../../components/PhoneInput";
import TittleInput from "../../components/TittleInput";
import CpfInput from "../../components/CpfInput";

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
      <CustomStatusBar backgroundColor="#83239F" barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <CustomBackButton />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 0}
        >
          <View style={{ flex: 1, position: "relative" }}>
            {modalIsOpen && (
              // Overlay que fecha o modal ao clicar fora
              <TouchableWithoutFeedback onPress={closeModalIfClickedOutside}>
                <View style={styles.modalOverlay} pointerEvents="auto" />
              </TouchableWithoutFeedback>
            )}

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              scrollEnabled={!modalIsOpen}
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.innerContent}>
                <Text variant="headlineMedium" style={styles.title}>
                  Preencha os dados para criar a sua conta.
                </Text>

                {/* Entradas */}
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
                  <GenderPicker value={gender} onValueChange={setSex} icon="venus-mars" />
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

                <TouchableOpacity
                  style={styles.button}
                  // onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Modal Data */}
            {dateModalVisible && (
              <TouchableWithoutFeedback onPress={() => { /* impede fechar ao clicar dentro do modal */ }}>
                <Animatable.View animation="fadeInUp" style={styles.datePickerModal} pointerEvents="auto">
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate}
                    locale="pt-BR"
                  />
                  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDate}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </TouchableWithoutFeedback>
            )}

            {/* Modal Sexo */}
            {sexModalVisible && (
              <TouchableWithoutFeedback onPress={() => { /* impede fechar ao clicar dentro do modal */ }}>
                <Animatable.View animation="fadeInUp" style={styles.datePickerModal} pointerEvents="auto">
                  <TouchableOpacity style={styles.confirmButton} onPress={setSexMasc}>
                    <Text style={styles.buttonTextGender}>Masculino</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmButton} onPress={setSexFem}>
                    <Text style={styles.buttonTextGender}>Feminino</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  innerContent: {
    paddingHorizontal: 16,
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
    zIndex: 30,
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
  buttonTextGender: {
    color: "#fff",
    fontSize: 16,
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
    button: {
    position: "absolute",
    backgroundColor: "#83239F",
    borderRadius: 15,
    paddingVertical: 15,
    width: "60%",
    alignSelf: "center",
    bottom: "-10%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
