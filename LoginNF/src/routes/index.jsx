import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignInPt1";
import SignIn2 from "../pages/SignInPt2";
import SignIn3 from "../pages/SigInPt3";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn2"
        component={SignIn2}
        options={{ headerShown: false }}
      />

       <Stack.Screen
        name="SignIn3"
        component={SignIn3}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
