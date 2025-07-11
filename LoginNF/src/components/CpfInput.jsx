import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInputMask } from "react-native-masked-text"; 

export default function CpfInput({
  value,
  onChangeText,
  keyboardType,
  error,
  icon,
  maxLength,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInputMask
        type="cpf"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        error={error}
        maxLength={maxLength}
        style={styles.input}
        selectionColor="#83239F"
      />
      {icon && (
        <Icon name={icon} size={30} color="#83239F" style={styles.iconStyle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15, 
    position: "relative", 
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5, 
    paddingHorizontal: 16, 
    height: 40, 
    borderWidth: 1, 
    borderColor: "#78747d", 
  },
  iconStyle: {
    position: "absolute",
    top: 7,
    right: 15, 
  },
});
