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
import Icon from "react-native-vector-icons/MaterialIcons";
import TittleInput from "../../components/TittleInput";
import StepIndicator from "../../components/StepIndicator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CadastroDados3 = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNextPress = () => {
    navigation.navigate("SignIn3");
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

  return (
    <>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#fafafa", flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
                style={{
                  fontWeight: "bold",
                  color: "#83239F",
                  textAlign: "center",
                }}
              >
                Senha
              </Text>

              <Text
                variant="headlineMedium"
                style={{
                  color: "#000",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Vamos criar a sua senha?
              </Text>

              <Text
                variant="headlineSmall"
                style={{
                  color: "#000",
                  fontSize: 16,
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                Falta pouco para finalizar seu cadastro. 
              </Text>

              <TittleInput label="Senha:" />
              <MyTextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon="lock"
                maxLength={16}
              />

              <TittleInput label="Confirme sua senha:" />
              <MyTextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                icon="lock"
                maxLength={16}
              />
            </ScrollView>
            <VStack style={{ padding: 16, paddingBottom: "15%", gap: 12 }}>
              <StepIndicator currentStep={3} totalSteps={3} />
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

export default CadastroDados3;
