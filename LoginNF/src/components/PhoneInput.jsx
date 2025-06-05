import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-paper"; // Usando o TextInput do react-native-paper
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInputMask } from "react-native-masked-text"; // Importando a máscara

export default function MyTextInput({
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
  error,
  icon,
  maxLength,
  mask, // Adicionando o prop de máscara
  placeholder, // Adicionando o prop de placeholder
}) {
  const theme = {
    colors: {
      primary: "#83239F", 
      underlineColor: "transparent",
    },
  };

  return (
    <View style={styles.inputContainer}>
      {/* Usando o TextInput do react-native-paper com a máscara */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        theme={theme}
        style={styles.input}
        placeholder={placeholder} // Aqui está o placeholder
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        error={error}
        maxLength={maxLength}
        labelStyle={styles.labelStyle} // Aplicando a estilização da label flutuante
        render={() => 
          <TextInputMask 
            type="cel-phone" 
            onChangeText={onChangeText} 
            value={value} 
            style={styles.inputJr} 
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
    height: 50, 
    borderWidth: 1, 
    borderColor: "#78747d", 
  },
  inputJr: {
    backgroundColor: "#fff",
    borderRadius: 5, 
    paddingHorizontal: 16, 
    minHeight: 50, 
  },
  iconStyle: {
    position: "absolute",
    top: 15,
    right: 15, 
  },

  labelStyle: {
    position: "absolute", // Faz a label flutuar
    top: -10, // Ajusta a posição da label para cima
    left: 16, // Ajusta a posição da label para a esquerda
    fontSize: 12, // Ajusta o tamanho da label se necessário
    color: "#83239F", // Cor da label, que pode ser a cor principal do seu tema
  },
});
