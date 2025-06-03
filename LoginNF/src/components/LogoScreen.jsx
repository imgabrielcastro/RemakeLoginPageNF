import React from "react";
import * as Animatable from "react-native-animatable";
import { View, StyleSheet, Image } from "react-native";

const LogoScreen = ({ children, style }) => {
  return (
    <View style={styles.containerLogo}>
      <Image
        source={require("../../src/assets/logoNF.png")}
        style={{ width: "70%", height: '30%' }}
        resizeMode="contain"
      />

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    bottom: "5%",
    marginTop: "10%",
    marginBottom: '-30%'
  },
});

export default LogoScreen;
