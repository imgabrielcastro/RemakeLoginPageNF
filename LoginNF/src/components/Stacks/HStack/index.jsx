import { View } from "react-native";

const VStack = (props) => {
  const { children } = props;
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>{children}</View>
  );
};

export default VStack;