import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Picker,
} from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "../src/reducers/reducer";

const store = createStore(reducer);


const DATA = [
  {
    id: "adaeh-12dad-123adea",
    title: "First Task",
    statusCode: "todo",
  },
  {
    id: "adaeh-12dad-123adea123",
    title: "Second Task",
    statusCode: "doing",
  },
  {
    id: "adaeh-12dad-123adea312",
    title: "Third Task",
    statusCode: "done",
  },
];

export default function TodoList(props) {
  const [modalVis, setModalVis] = useState(false);
  const [InputDesc, setInputDesc] = useState("");
  const [Status, setStatus] = useState({code: '', status: ''});

  const renderTasks = ({ item }) => <Item item={item} />;

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.desc}>{item.title}</Text>
      <View style={{width: '25%'}}>
        <TouchableHighlight
          onPress={(item) => _changeStatusCode(item)}
          style={(styles.btnStatus, styles[item.statusCode])}
        >
          <View>
            <Text style={{color: 'white'}}>{item.statusCode}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );

  const _changeStatusCode = (item) => {
    let newCode = "";
    switch (item.statusCode) {
      case "todo":
        newCode = "doing";
        break;
      case "doing":
        newCode = "done";
        break;
      case "done":
        newCode = "todo";
        break;
    }

    let updatedItem = {
      ...item,
      statusCode: newCode
    }

    //props.dispatch({type: 'update/item'}, updatedItem);
  };

  return (
    <Provider store={store}>
      <SafeAreaView>
        <View style={styles.container}>
          <Modal animationType="slide" transparent={true} visible={modalVis}>
            <View style={styles.centeredView}>
              <Text style={{ color: "white", fontSize: 25 }}>
                Add a new Task to the List
              </Text>
              <View style={styles.modalView}>
                <Text>Description</Text>
                <TextInput
                  style={styles.input}
                  editable
                  onChangeText={(text) => setInputDesc(text)}
                  value={InputDesc}
                />
                <Text>Set the status</Text>
                <Picker
                  selectedValue={Status}
                  onValueChange={(itemValue, itemIndex) => setStatus(itemValue, itemIndex)}
                  style={{ height: 50, width: "30%" }}
                >
                  <Picker.Item label="To Do" value="todo" />
                  <Picker.Item label="Doing" value="doing" />
                  <Picker.Item label="Done" value="done" />
                </Picker>
                <View
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  <TouchableHighlight
                    style={styles.addBtn}
                    underlayColor={"#12ED66"}
                    onPress={() => {
                      let newItem = {
                        title: InputDesc,
                        statusCode: Status,
                        id: (Math.random() * 10).toFixed(4),
                      };
                      console.log(newItem);
                      props.dispatch({type: 'item/save'}, newItem);
                    }}
                  >
                    <View>
                      <Text>Add New Task</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              <TouchableHighlight onPress={() => setModalVis(false)}>
                <View>
                  <Text style={{ color: "white" }}>X</Text>
                </View>
              </TouchableHighlight>
            </View>
          </Modal>

          <Text style={styles.title}>Lista To Do 2</Text>
          <FlatList
            style={styles.list}
            data={DATA}
            renderItem={renderTasks}
            keyExtractor={(item) => item.id}
          />
          <TouchableHighlight
            underlayColor={"#12ED66"}
            style={styles.addBtn}
            onPress={() => setModalVis(!modalVis)}
          >
            <View>
              <Text>Add Task</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  list: {
    width: "100%",
  },
  title: {
    margin: 5,
  },
  item: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  desc: {
    fontSize: 15,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 4,
  },
  addBtn: {
    width: "100%",
    height: 42,
    backgroundColor: "green",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 100,
    textAlign: "center",
  },

  btnStatus: {
    borderRadius: 3,
  },

  footerBtn: {
    width: "100%",
  },

  todo: {
    backgroundColor: "red",
  },

  doing: {
    backgroundColor: "orange",
  },

  done: {
    backgroundColor: "green",
  },
});
