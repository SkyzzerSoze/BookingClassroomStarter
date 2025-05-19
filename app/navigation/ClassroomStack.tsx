import { createStackNavigator } from "@react-navigation/stack";
import ClassroomsScreen from "../screens/ClassroomsScreen";
import ClassroomDetailScreen from "../screens/ClassroomDetailScreen";

const Stack = createStackNavigator();

const ClassroomStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Classrooms" component={ClassroomsScreen} options={{ title: "Salles" }} />
      <Stack.Screen name="ClassroomDetail" component={ClassroomDetailScreen} options={{ title: "Détail de la salle" }} />
    </Stack.Navigator>
  );
};

export default ClassroomStack;
