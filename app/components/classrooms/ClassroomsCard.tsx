import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

interface Props {
  classroom: {
    id: string;
    name: string;
    capacity: number;
  };
  onPress: () => void;
}

const ClassroomCard = ({ classroom, onPress }: Props) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">{classroom.name}</Text>
        <Text variant="bodySmall">Capacité : {classroom.capacity}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onPress}>Voir</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});

export default ClassroomCard;
