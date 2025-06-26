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
import CepInput from "../../components/CepInput";
import CitySelector from "../../components/ModalCity";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CadastroDados3 =() => {
const navigation = useNavigation();

const [senha, setSenha] = useState("");

const handleBackPress = () => {
  navigation.goBack();
};

useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Senha",
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

return(
    <KeyboardAvoidingView
            style={{ backgroundColor: "#fafafa", flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
        <VStack style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
            >
        <TittleInput label="Informe sua senha:"/>
        <MyTextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            icon="lock"
            maxLength={16}
        />
    </ScrollView>
    </VStack>
    </KeyboardAvoidingView>
)

}



export default CadastroDados3;