import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";


export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome Sérgio, your friends suck cock </Text>
      
      <Button
      style={styles.button}
        title="To Do List"
        onPress={() => 
          navigation.navigate('TodoList')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  button: {
    marginTop: 10
  }
})
