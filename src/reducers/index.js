import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  contacts: contactReducer,
  errors: errorReducer
});
