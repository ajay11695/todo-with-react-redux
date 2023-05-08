import { legacy_createStore } from "redux";

function reducerTodo(state = [], action) {

  switch (action.type) {
    case "add":
      return state.concat({ todo: action.todo, isCompleted: false });
    case "search":
      return state.filter(t=>t.todo.includes(action.todo));
    case "remove":
      return state.filter((s, i) => i !== Number(action.id));
    case "toggle":
      return state.filter((s, i) => {
        if (i === Number(action.id)) {
          s.isCompleted = action.isCompleted;
        }
        return s;
      })
    default:
      return state;
  }
}

let store = legacy_createStore(reducerTodo);
export default store;