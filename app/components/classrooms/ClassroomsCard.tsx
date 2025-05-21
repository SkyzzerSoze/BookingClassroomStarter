import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{classroom.name}</Text>
          <Text variant="bodySmall">Capacité : {classroom.capacity}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={onPress}>Voir</Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});

export default ClassroomCard;
