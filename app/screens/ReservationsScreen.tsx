import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import UserService from "../services/user.service";

const ReservationsScreen = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    try {
      const token = await user?.token; // si `token` n'est pas stocké dans `user`, utilise getToken() depuis ton utilitaire
      const data = await UserService.getUserReservations(token);
      setReservations(data);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes Réservations</Text>

      {reservations.length > 0 ? (
        reservations.map((res) => (
          <Card key={res.id} style={styles.card}>
            <Card.Content>
              <Text>Salle : {res.classroom?.name}</Text>
              <Text>Début : {res.start}</Text>
              <Text>Fin : {res.end}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text>Aucune réservation pour le moment.</Text>
      )}
    </ScrollView>
  );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
