export function reducer(state = { items: undefined }, action) {
  switch (action.type) {
    case "save/items":
      console.log("Items salvos");
      return state;

    case "add/item":
      let lista = [...state.items];
      lista.push(action.item);
      return {
        ...state,
        items: lista,
      };

    default:
      return state;
  }
}
