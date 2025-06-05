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
import { TextInputMask } from "react-native-masked-text";
import PhoneInput from "../../components/PhoneInput";
import TittleInput from "../../components/TittleInput";

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
  const [sex, setSex] = useState(false);
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
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {}
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const showSexpicker = () => {
    setSexModalVisible(true);
    setDateModalVisible(false);
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
    setDateModalVisible(true);
    setSexModalVisible(false);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const handleConfirmDate = () => {
    const currentDate = tempDate;

    if (currentDate > new Date()) {
      Alert.alert(
        "Erro",
        "A data de nascimento não pode ser maior que a data atual."
      );
      setTempDate(new Date());
      setDataNascimento("");
      setDateModalVisible(false);
      return;
    }

    setShow(Platform.OS === "ios" ? true : false);
    setDate(currentDate);
    setDataNascimento(currentDate.toLocaleDateString());
    setDateModalVisible(false);
  };

  const closeModalIfClickedOutside = () => {
    if (sexModalVisible) setSexModalVisible(false);
    if (dateModalVisible) setDateModalVisible(false);
  };

  return (
    <>
      <CustomStatusBar backgroundColor="#83239F" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <CustomBackButton />
        <TouchableWithoutFeedback onPress={closeModalIfClickedOutside}>
          <View style={{ flex: 1 }}>
            <VStack style={styles.vStack}>
              <ScrollView style={styles.scrollContainer}>
                <Text variant="headlineMedium" style={styles.title}>
                  Preencha os dados para criar a sua conta.
                </Text>

                <TittleInput label="Nome" />
                <MyTextInput
                  label="Nome completo"
                  value={name}
                  onChangeText={setName}
                  icon="account-circle"
                  maxLength={39}
                />

                <TittleInput label="Data de Nascimento" />
                <TouchableOpacity onPress={showDatepicker}>
                  <DataPickerButton
                    label="Data de nascimento"
                    value={dataNascimento}
                    icon="event"
                    editable={false}
                    pointerEvents="none"
                  />
                </TouchableOpacity>

                <TittleInput label="Sexo" />
                <TouchableOpacity onPress={showSexpicker}>
                  <GenderPicker
                    label="Sexo"
                    value={gender}
                    onValueChange={setSex}
                    icon="venus-mars"
                  />
                </TouchableOpacity>

                <TittleInput label="Telefone" />
                <PhoneInput
                  label="Telefone"
                  value={phone}
                  onChangeText={setPhone}
                  icon="phone"
                  keyboardType="numeric"
                  mask="(99) 99999-9999"
                />
              </ScrollView>
              {dateModalVisible && (
                <Animatable.View
                  animation="fadeInUp"
                  style={styles.datePickerModal}
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
                    <Text style={styles.buttonText}>Confirmar</Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}

              {sexModalVisible && (
                <Animatable.View
                  animation="fadeInUp"
                  style={styles.datePickerModal}
                >
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={setSexMasc}
                  >
                    <Text style={styles.buttonTextGender}>Masculino</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={setSexFem}
                  >
                    <Text style={styles.buttonTextGender}>Feminino</Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            </VStack>
          </View>
        </TouchableWithoutFeedback>
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
    paddingBottom: 100,
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

  buttonTextGender: {
    color: "#fff",
    fontSize: 16,
    height: 20,
    margin: 5,
  },
});
