import React from "react";
import { View, StyleSheet } from "react-native";

const VStack = (props) => {
  const { children, style } = props;
  return (
    <View style={[{ display: "flex", flexDirection: "column" }, style]}>
      {children}
    </View>
  );
};

export default VStack;
