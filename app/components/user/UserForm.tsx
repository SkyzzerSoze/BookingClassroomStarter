import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";

const UserForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (name: string, value: string) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted data:", credentials);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        mode="outlined"
        value={credentials.email}
        onChangeText={(value) => handleChange("email", value)}
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={credentials.password}
        onChangeText={(value) => handleChange("password", value)}
        style={styles.input}
      />

      <TextInput
        label="Name"
        mode="outlined"
        value={credentials.name}
        onChangeText={(value) => handleChange("name", value)}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
  },
});

