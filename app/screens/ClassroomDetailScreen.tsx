import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAuth from "../hooks/useAuth";

const ClassroomDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { user } = useAuth();

  const [classroom, setClassroom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [reserving, setReserving] = useState(false);

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
    try {
      setReserving(true);
      const res = await fetch(`http://localhost:8000/api/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          classroomId: classroom.id,
          start,
          end,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Erreur lors de la réservation");

      // Recharger la salle pour afficher la nouvelle réservation
      fetchClassroom();
    } catch (error) {
      console.error("Erreur réservation :", error);
    } finally {
      setReserving(false);
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

      {/* Sélection de dates */}
      <View style={styles.datePickers}>
        <Button mode="outlined" onPress={() => setShowStartPicker(true)}>
          Choisir date de début : {start.toLocaleString()}
        </Button>
        <Button mode="outlined" onPress={() => setShowEndPicker(true)}>
          Choisir date de fin : {end.toLocaleString()}
        </Button>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={start}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStart(selectedDate);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={end}
          mode="datetime"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEnd(selectedDate);
          }}
        />
      )}

      <Button
        mode="contained"
        style={styles.button}
        onPress={handleReservation}
        loading={reserving}
        disabled={reserving}
      >
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
  datePickers: {
    gap: 10,
    marginTop: 20,
  },
});
