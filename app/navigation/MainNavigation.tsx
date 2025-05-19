import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigation from "./TabNavigation";
import ClassroomDetailScreen from "../screens/ClassroomDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const MainNavigation = () => {
  const { user, loading } = useContext(AuthContext); 

  const Stack = createStackNavigator();

  if (loading) {
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
          <>
            <Stack.Screen name="Tab" component={TabNavigation} />
            <Stack.Screen name="ClassroomDetail" component={ClassroomDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
