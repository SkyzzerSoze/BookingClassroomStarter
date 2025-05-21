import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import ReservationService from "../services/reservation.service";

const ClassroomDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { user } = useAuth();

  const [classroom, setClassroom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [resLoading, setResLoading] = useState(false);

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

  const handleReservation = async () => {
    setResLoading(true);
    try {
      await ReservationService.createReservation({
        classroomId: id,
        start,
        end,
      });
      fetchClassroom(); // Rafraîchit la liste des réservations
      setStart("");
      setEnd("");
    } catch (error) {
      console.error("Erreur de réservation :", error);
    } finally {
      setResLoading(false);
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
      {classroom.reservations?.length ? (
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
        <Text>Aucune réservation.</Text>
      )}

      <Text style={styles.subtitle}>Nouvelle réservation :</Text>
      <TextInput
        label="Début (YYYY-MM-DD HH:MM)"
        value={start}
        onChangeText={setStart}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Fin (YYYY-MM-DD HH:MM)"
        value={end}
        onChangeText={setEnd}
        style={{ marginBottom: 10 }}
      />
      <Button
        mode="contained"
        onPress={handleReservation}
        loading={resLoading}
        disabled={resLoading || !start || !end}
      >
        Réserver cette salle
      </Button>
    </ScrollView>
  );
};

export default ClassroomDetailScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  reservationCard: { marginBottom: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
