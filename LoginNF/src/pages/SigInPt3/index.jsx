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

return(
    <View>
        <Text>Oi</Text>
    </View>
)

}



export default CadastroDados3;