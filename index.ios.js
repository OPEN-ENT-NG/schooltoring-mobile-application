import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "./src/App";
import store from "./src/store/store";

import config from "./app.json";

global.config = config;

const Schooltoring = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent("Schooltoring", () => Schooltoring);
