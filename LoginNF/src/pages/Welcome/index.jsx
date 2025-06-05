import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BackgroundGradient from "../../components/GradientBackground";
import CustomStatusBar from "../../components/StatusBar";

const mockData = require("../../data/mockData.json");

export default function Welcome() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const user = mockData.usuarios.find(
      (user) => user.cpf === inputValue || user.email === inputValue
    );

    if (user) {
      console.log("Teste");
    } else {
      navigation.navigate("SignIn");
    }
  };

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <BackgroundGradient>
        <CustomStatusBar barStyle="dark-content" />
        <View style={styles.containerLogo}>
          <Animatable.Image
            animation="flipInX"
            source={require("../../assets/logoNF.png")}
            style={{ width: "70%" }}
            resizeMode="contain"
          />
        </View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.tittle}>
            Bem-vindo ao Next Fit, sua jornada começa agora.
          </Text>
          <Text style={styles.text}>
            Preencha abaixo para criar ou acessar sua conta Next Fit.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail ou CPF*"
            placeholderTextColor="#aaa"
            keyboardType="default"
            onFocus={() => setKeyboardVisible(true)}
            onBlur={() => setKeyboardVisible(false)}
            onChangeText={setInputValue}
          />

          {!keyboardVisible && (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Vamos lá!</Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
      </BackgroundGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1.8,
    backgroundColor: "#FAFAFA",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  tittle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    color: "#a1a1a1",
    fontSize: 15,
    paddingTop: 10,
  },
  button: {
    position: "absolute",
    backgroundColor: "#83239F",
    borderRadius: 15,
    paddingVertical: 15,
    width: "60%",
    alignSelf: "center",
    bottom: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 60,
    width: "90%",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    color: "#83239F",
    textAlign: "center",
    borderWidth: 1.5,
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#a1a1a1",
  },
});
