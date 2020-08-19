import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

export default function App() {

  _onPressButton = () => {
    alert('Apertou o botao!')
  }



  return (
    <View style={styles.container}>
      <Text>Welcome Sérgio, your friends suck cock </Text>
      <StatusBar style="auto" />
      <TouchableNativeFeedback
        onPress={this._onPressButton}
        backgorund={
          Platform.OS === "android"
            ? TouchableNativeFeedback.SelectableBackground()
            : ""
        }
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Meu Botao
            {Platform.OS !== "android" ? "(Android Only)" : ""}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

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
