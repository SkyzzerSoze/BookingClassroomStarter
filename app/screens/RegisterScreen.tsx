import { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import useAuth from "../hooks/useAuth";

const RegisterScreen = () => {
  const { signin } = useAuth(); // ou register si tu le sépares
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setCredentials({ ...credentials, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      // suppose que ton backend renvoie { token, user } à l'inscription
      await signin(credentials); // ou AuthService.register(credentials)
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Register</Text>

      <TextInput
        label="Name"
        value={credentials.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        label="Email"
        value={credentials.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        label="Password"
        secureTextEntry
        value={credentials.password}
        onChangeText={(value) => handleChange("password", value)}
      />

      <Button onPress={handleSubmit} mode="contained">
        Register
      </Button>
    </View>
  );
};

export default RegisterScreen;
