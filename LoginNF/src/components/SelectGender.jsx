import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DataPicker({
  value,
  onChangeText,
  secureTextEntry,
  error,
  icon,
}) {

  const theme = {
    colors: {
      primary: "#83239F",      
      underlineColor: "transparent",  
    },
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        theme={theme}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        error={error}
        pointerEvents="none" 
        editable={false}
      />
      {icon && (
        <Icon name={icon} size={30} color="#83239F" style={styles.iconStyle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    position: "relative",
  },
  input: {
    marginBottom: 10,
    color: "#fff",
  },
  iconStyle: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
