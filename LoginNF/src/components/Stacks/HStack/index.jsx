import { View } from "react-native";

const HStack = (props) => {
  const { children } = props;
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>{children}</View>
  );
};

export default HStack;