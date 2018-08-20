import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import subjects from "./subjects";
import matches from "./matches";
import requests from "./requests";
import conversations from "./conversations";

const rootReducer = combineReducers({
  auth,
  user,
  subjects,
  matches,
  requests,
  conversations
});

export default rootReducer;
