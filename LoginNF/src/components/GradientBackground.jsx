import React from "react";
import { LinearGradient } from "react-native-linear-gradient";

const GradientBackGround = (props) => {
  const { children, styles } = props;
  return (
    <LinearGradient
      colors={["#FAFAFA", "#83239F"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {{ children }}
    </LinearGradient>
  );
};

export default GradientBackGround;
