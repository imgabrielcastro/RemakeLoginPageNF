import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from 'react-native';

const GradientBackGround = ({ children, style }) =>{
  return (
    <LinearGradient
      colors={["#FAFAFA", "#83239F"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      { children }
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});

export default GradientBackGround;
