export function reducer(
  state = {
    items: [],
    visibility: false,
    modalItem: {
      title: "",
      status: "",
      statusCode: "",
      id: "",
    },
  },
  action
) {
  let listaParaUpdate = [...state.items];
  let novaLista = [];

  switch (action.type) {
    case "save/items":
      return state;
    case "add/item":
      let lista = [...state.items];
      lista.push(action.item);
      return {
        ...state,
        items: lista,
      };

    case "update/item":
      listaParaUpdate.forEach((item) => {
        if (item.id === action.item.id) {
          novaLista.push(action.item);
        } else {
          novaLista.push(item);
        }
      });
      return {
        ...state,
        items: novaLista,
      };

    case "delete/item":
      listaParaUpdate.forEach((item) => {
        if (item.id !== action.item.id) {
          novaLista.push(item);
        }
      });
      return {
        ...state,
        items: novaLista,
      };
    case "open/modal":
      return {
        ...state,
        visibility: true,
        modalItem: action.item,
      };
    case "close/modal":
      return {
        ...state,
        visibility: false,
      };
    default:
      return state;
  }
}
