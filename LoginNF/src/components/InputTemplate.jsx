import React from "react";
import { StyleSheet  } from "react-native";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function MyTextInput({
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  error,
  icon,
  maxLength,
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
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        error={error}
        maxLength={maxLength}
      />
      {icon && (
        <Icon name={icon} size={25} color="#83239F" style={styles.iconStyle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    position: "relative",
    color: '#000'
  },
  input: {
    marginBottom: 10,
    paddingRight: 40,
    height: 40,
    fontSize: 14,
    borderolor: '#d8d8d8'
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 15,
  },
});
