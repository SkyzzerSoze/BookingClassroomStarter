import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const MainNavigation = () => {
  const { user, loading } = useContext(AuthContext); 

  const Stack = createStackNavigator();

  if (loading) {
    // Afficher un indicateur de chargement pendant le chargement
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Tab" component={TabNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
