import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import subjects from "./subjects";

const rootReducer = combineReducers({
  auth,
  user,
  subjects
});

export default rootReducer;
