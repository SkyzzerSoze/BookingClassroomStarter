import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ClassroomCard from "../components/classrooms/ClassroomsCard";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  const fetchAllClassrooms = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/classrooms");
      const data = await response.json();
      setClassrooms(data);
    } catch (error) {
      console.error("Erreur lors du chargement des salles :", error);
    }
  };

  const handleClassroomPress = (id: string) => {
    navigation.navigate("ClassroomDetail", { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des salles</Text>
      <View style={styles.classroomsContainer}>
        {classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            classroom={classroom}
            onPress={() => handleClassroomPress(classroom.id)}
          />
        ))}
      </View>
    </View>
  );
};

export default ClassroomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  classroomsContainer: {
    gap: 12,
  },
});
