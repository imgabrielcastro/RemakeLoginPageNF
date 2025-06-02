import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function MyTextInput({label, value, onChangeText, keyboardType, secureTextEntry, error}){
   return(
    <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    mode="outlined"
    style={styles.input}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    error={error}
    />
   );
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 16,
    }
})