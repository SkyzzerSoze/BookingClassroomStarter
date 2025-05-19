import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const ClassroomDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [classroom, setClassroom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassroom();
  }, []);

  const fetchClassroom = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/classrooms/${id}`);
      const data = await response.json();
      setClassroom(data);
    } catch (error) {
      console.error("Erreur lors du chargement de la salle :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !classroom) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={classroom.name} />
        <Card.Content>
          <Text>Capacité : {classroom.capacity}</Text>
        </Card.Content>
      </Card>

      <Text style={styles.subtitle}>Réservations :</Text>
      {classroom.reservations && classroom.reservations.length > 0 ? (
        classroom.reservations.map((res: any) => (
          <Card key={res.id} style={styles.reservationCard}>
            <Card.Content>
              <Text>Par : {res.user.email}</Text>
              <Text>De : {res.start}</Text>
              <Text>À : {res.end}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>Aucune réservation pour cette salle.</Text>
      )}

      <Button mode="contained" style={styles.button} onPress={() => {}}>
        Réserver cette salle
      </Button>
    </ScrollView>
  );
};

export default ClassroomDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  reservationCard: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
