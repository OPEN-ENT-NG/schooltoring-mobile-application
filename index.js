import React from "react";
import { AppRegistry, StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import App from "./src/App";
import store from "./src/store/store";
import { COLORS } from "./src/styles/common";

import AppCenter from "./src/AppCenter";

import config from "./app.json";

global.config = config;
global.appcenter = new AppCenter();

const Schooltoring = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={COLORS.BACKGROUND}
          barStyle="dark-content"
        />
        <App />
      </View>
    </Provider>
  );
};

AppRegistry.registerComponent("Schooltoring", () => Schooltoring);
