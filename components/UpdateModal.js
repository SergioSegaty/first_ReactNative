import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { connect } from "react-redux";

function UpdateModal(props) {
  const [InputDesc, setInputDesc] = useState(props.item.title);

  console.log("Entrou na Modal");
  console.log(props);
  return (
    <Modal visible={props.visibility}>
      <View style={modal.centeredView}>
        <View style={modal.modalView}>
          <Text> Edit {props.item.title} </Text>

          <Text>Description</Text>
          <TextInput
            style={modal.input}
            editable
            onChangeText={(text) => setInputDesc(text)}
            value={InputDesc}
          />

          <View style={{ overflow: "hidden", borderRadius: 5 }}>
            <TouchableHighlight
              onPress={() => {
                let newItem = {
                  ...props.item,
                  title: InputDesc,
                };

                props.dispatch({ type: "close/modal" });
                props.dispatch({ type: "update/item", item: newItem });
              }}
              underlayColor="#4AE54A"
              style={{ backgroundColor: "#30CB00", padding: 5 }}
            >
              <View>
                <Text>Salvar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => props.dispatch({ type: "close/modal" })}
        >
          <View
            style={{
              backgroundColor: "red",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <Text style={{ color: "white", width: 20, textAlign: "center" }}>
              X
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

const MapStateToProps = (state) => {
  return {
    visibility: state.visibility,
    item: state.modalItem,
  };
};

export default connect(MapStateToProps)(UpdateModal);

const modal = StyleSheet.create({
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 100,
    textAlign: "center",
    marginBottom: 10,
  },
});
