import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ClassroomCard from "../components/classrooms/ClassroomsCard";
import { useNavigation } from "@react-navigation/native";
import { Text, TextInput, Button } from "react-native-paper";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [minCapacity, setMinCapacity] = useState(""); // Ajout du filtre capacité
  const [sortBy, setSortBy] = useState<"name" | "capacity" | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [classrooms, filterText, minCapacity, sortBy]);

  const fetchAllClassrooms = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/classrooms");
      const data = await response.json();
      setClassrooms(data);
      setFilteredClassrooms(data);
    } catch (error) {
      console.error("Erreur lors du chargement des salles :", error);
    }
  };

  const applyFilterAndSort = () => {
    let data = [...classrooms];

    // Filtrer par nom (ignore case)
    if (filterText) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Filtrer par capacité minimale
    if (minCapacity) {
      const min = parseInt(minCapacity, 10);
      if (!isNaN(min)) {
        data = data.filter((c) => c.capacity >= min);
      }
    }

    // Trier
    if (sortBy === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "capacity") {
      data.sort((a, b) => a.capacity - b.capacity);
    }

    setFilteredClassrooms(data);
  };

  const handleClassroomPress = (id: string) => {
    navigation.navigate("ClassroomDetail", { id });
  };

  const handleSortByName = () => {
    setSortBy(sortBy === "name" ? null : "name");
  };

  const handleSortByCapacity = () => {
    setSortBy(sortBy === "capacity" ? null : "capacity");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des salles</Text>

      <TextInput
        label="Filtrer par nom"
        value={filterText}
        onChangeText={setFilterText}
        style={{ marginBottom: 12 }}
      />
      <TextInput
        label="Capacité minimale"
        value={minCapacity}
        onChangeText={setMinCapacity}
        keyboardType="numeric"
        style={{ marginBottom: 12 }}
      />

      <View style={styles.buttonsContainer}>
        <Button
          mode={sortBy === "name" ? "contained" : "outlined"}
          onPress={handleSortByName}
          style={styles.button}
        >
          Trier par nom
        </Button>
        <Button
          mode={sortBy === "capacity" ? "contained" : "outlined"}
          onPress={handleSortByCapacity}
          style={styles.button}
        >
          Trier par capacité
        </Button>
        <Button
          mode={!sortBy ? "contained" : "outlined"}
          onPress={() => setSortBy(null)}
          style={styles.button}
        >
          Réinitialiser
        </Button>
      </View>

      <View style={styles.classroomsContainer}>
        {filteredClassrooms.length === 0 ? (
          <Text>Aucune salle trouvée.</Text>
        ) : (
          filteredClassrooms.map((classroom) => (
            <ClassroomCard
              key={classroom.id}
              classroom={classroom}
              onPress={() => handleClassroomPress(classroom.id)}
            />
          ))
        )}
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
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  classroomsContainer: {
    gap: 12,
  },
});