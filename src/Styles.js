'use strict';

import StyleSheet from "react-native";

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

export {styles};
