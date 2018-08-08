import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import subjects from "./subjects";
import matches from "./matches";

const rootReducer = combineReducers({
  auth,
  user,
  subjects,
  matches
});

export default rootReducer;
