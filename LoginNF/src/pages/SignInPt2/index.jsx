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
import * as Animatable from "react-native-animatable";
import TittleInput from "../../components/TittleInput";
import StepIndicator from "../../components/StepIndicator";
import CepInput from "../../components/CepInput";

const CadastroDados2 = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate("SignIn2");
  };
  const handleBackPress = () => {
    navigation.goBack();
  };


  const [cep, setCep] = useState("")

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Endereço",
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

  return (
    <>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#fafafa", flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, position: "relative" }}>
          <VStack style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
            >
              <Text
                variant="headlineMedium"
                style={{ color: "#000", marginBottom: 20, fontSize: 22 }}
              >
                Preencha os dados para criar a sua conta.
              </Text>

              {/* <TittleInput label="Nome completo *" />
              <MyTextInput
                // value={name}
                // onChangeText={setName}
                icon="account-circle"
                maxLength={39}
              /> */}

              <TittleInput label="CEP *" />
              <CepInput
                value={cep}
                onChangeText={setCep}
                icon="person"
                keyboardType="numeric"
                mask="11111-111"
                maxLength={9}
              /> 

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <StepIndicator currentStep={2} totalSteps={3} />
              </View>
            </ScrollView>
            <VStack style={{ padding: 16, paddingBottom: 32, gap: 12 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#83239F",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleNextPress}
                // onPress={handleSubmit}
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
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
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

export default CadastroDados2;
