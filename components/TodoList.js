import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableHighlight,
  TextInput,
  Picker,
} from "react-native";
import UpdateModal from "./UpdateModal";
//import { styles } from "../src/Styles";
import { connect } from "react-redux";

function TodoList(props) {
  const [modalVis, setModalVis] = useState(false);
  const [InputDesc, setInputDesc] = useState("");
  const [Status, setStatus] = useState("To Do");

  const renderTasks = ({ item }) => <Item item={item} />;

  const Item = ({ item }) => (
    <View style={styles.tarefa}>
      <Text style={styles.desc}>{item.title}</Text>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
            marginTop: 1.5,
          }}
        >
          <TouchableHighlight
            onPress={() => _changeStatusCode(item)}
            style={(styles.btnStatus, styles[item.statusCode])}
          >
            <View>
              <Text style={{ color: "white", textAlign: "center" }}>
                {item.status}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
            marginTop: 1.5,
            marginRight: 3,
          }}
        >
          <TouchableHighlight
            underlayColor={"white"}
            style={{ backgroundColor: "red", paddingHorizontal: 5 }}
            onPress={() => {
              props.dispatch({ type: "delete/item", item: item });
            }}
          >
            <View>
              <Text style={{ color: "white", textAlign: "center" }}>X</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
            marginTop: 1.5,
          }}
        >
          <TouchableHighlight
            underlayColor={"white"}
            style={{ backgroundColor: "blue", paddingHorizontal: 5 }}
            onPress={() => {
              props.dispatch({ type: "open/modal", item: item });
            }}
          >
            <View>
              <Text style={{ color: "white", textAlign: "center" }}>A</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );

  /**
   * This is to toggle the modal visibility
   */
  const _toggleModal = () => {
    setModalVis(!modalVis);
  };

  /**
   * This is to set the Status in a Oderly Pattern, also calling dispatch and
   * changing the state of the item.
   * @param {Object} item
   */
  const _changeStatusCode = (item) => {
    let newCode = "";
    let newStatus = "";

    switch (item.status) {
      case "To Do":
        newStatus = "Doing";
        newCode = "doing";
        break;
      case "Doing":
        newStatus = "Done";
        newCode = "done";
        break;
      case "Done":
        newStatus = "To Do";
        newCode = "todo";
        break;
      default:
        newStatus = "To Do";
        newCode = "todo";
    }
    let updatedItem = {
      ...item,
      status: newStatus,
      statusCode: newCode,
    };

    props.dispatch({ type: "update/item", item: updatedItem });
  };

  return (
    <SafeAreaView>
      <View>
        <UpdateModal />
      </View>
      <View style={styles.container}>
        {/* Start Modal */}
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
                onValueChange={(itemValue, itemIndex) =>
                  setStatus(itemValue, itemIndex)
                }
                style={{ height: 50, width: "30%" }}
              >
                <Picker.Item label="To Do" value="To Do" />
                <Picker.Item label="Doing" value="Doing" />
                <Picker.Item label="Done" value="Done" />
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
                      status: Status,
                      statusCode: Status.replace(" ", "").toLowerCase(),
                      id: (Math.random() * 10).toString(),
                    };
                    props.dispatch({ type: "add/item", item: newItem });
                    _toggleModal();
                    setInputDesc("");
                  }}
                >
                  <View>
                    <Text>Add New Task</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <TouchableHighlight onPress={() => setModalVis(false)}>
              <View
                style={{
                  backgroundColor: "red",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{ color: "white", width: 20, textAlign: "center" }}
                >
                  X
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>

        <FlatList
          style={styles.list}
          data={props.items}
          renderItem={renderTasks}
          keyExtractor={(item) => {
           return item.id;
          }}
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
  );
}

const MapStateToProps = (state) => {
  return {
    ...state,
    items: state.items,
  };
};

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
  tarefa: {
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    justifyContent: "space-between",
    alignSelf: "center",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  desc: {
    fontSize: 15,
    fontWeight: "bold",
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
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 100,
    textAlign: "center",
    marginBottom: 10,
  },

  btnStatus: {
    borderRadius: 3,
  },

  footerBtn: {
    width: "100%",
  },

  todo: {
    backgroundColor: "red",
    paddingHorizontal: 5,
  },

  doing: {
    backgroundColor: "orange",
    paddingHorizontal: 5,
  },

  done: {
    backgroundColor: "green",
    paddingHorizontal: 5,
  },
});

export default connect(MapStateToProps)(TodoList);
