import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import TodoList from "./components/TodoList";

const Stack = createStackNavigator();

export default function App() {
  // _onPressButton = () => {
  //   alert("Apertou o botao!");
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome sucka" }}
          />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          option={{ title: "Lista Tarefas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 35,
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },

  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
});
