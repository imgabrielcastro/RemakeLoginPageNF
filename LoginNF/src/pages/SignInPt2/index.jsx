import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  View,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../../components/InputTemplate";
import VStack from "../../components/Stacks/VStack";
import HStack from "../../components/Stacks/HStack";
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

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");

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
              <Text variant="headlineLarge" style={{fontWeight: 'bold', color: '#83239F', textAlign:"center"}}>
                Endereço
              </Text>

              <Text
                variant="headlineMedium"
                style={{ color: "#000", marginBottom: 20, fontSize: 20, textAlign:'center'}}
              >
                Preencha os dados do seu do endereço.
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
                keyboardType="numeric"
                mask="11111-111"
                maxLength={9}
              />

              <TittleInput label="Endereço" />
              <MyTextInput
                value={endereco}
                onChangeText={setEndereco}
                
              />

              <TittleInput label="Número" />
              <MyTextInput
                value={numero}
                onChangeText={setNumero}
                
                keyboardType="numeric"
              />

              <TittleInput label="Bairro" />
              <MyTextInput
                value={bairro}
                onChangeText={setBairro}
                
              />

              <TittleInput label="Complemento" />
              <MyTextInput
                value={complemento}
                onChangeText={setComplemento}
                
              />

              <TittleInput label="Cidade" />
              <MyTextInput
                value={cidade}
                onChangeText={setCidade}
                
              />
            </ScrollView>
            <VStack style={{ padding: 16, paddingBottom: "15%", gap: 12 }}>
              <StepIndicator currentStep={2} totalSteps={3}/>
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
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CadastroDados2;
