import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MyTextInput({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  error,
  icon,
}) {
  return (
    <View style={styles.inputContainer}>
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
      {icon && (
        <Icon name={icon} size={30} color="#83239F" style={styles.iconStyle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    bottom: '30%',
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
