import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function CepInput({
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
        type="custom"
        options={{ mask: "99999-999" }}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType={keyboardType}
        maxLength={maxLength}
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
    height: 50,
    borderWidth: 1,
    borderColor: "#78747d",
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 15,
  },
});
