import { createStore } from "redux";
import reducer from "./reducer/reducer"

let store = createStore(reducer)
// console.log(store);
// console.log(reducer);

export default store

