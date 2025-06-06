import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInputMask } from "react-native-masked-text"; 

export default function PhoneInput({
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
        theme={theme}
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        error={error}
        maxLength={maxLength}
        render={() => 
          <TextInputMask 
            type="cel-phone" 
            onChangeText={onChangeText} 
            value={value} 
            style={styles.inputJr} 
            maxLength={maxLength}
            selectionColor="#83239F"
          />
        }
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
    height: 55, 
    borderWidth: 1, 
    borderColor: "#78747d", 
  },
  inputJr: {
    borderRadius: 5, 
    paddingHorizontal: 16, 
    minHeight: 50, 
  },
  iconStyle: {
    position: "absolute",
    top: 15,
    right: 15, 
  },
});
