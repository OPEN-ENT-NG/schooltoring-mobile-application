import React from "react";
import { AppRegistry, StatusBar, View, YellowBox } from "react-native";
import { Provider } from "react-redux";
import App from "./src/App";
import store from "./src/store/store";
import { COLORS } from "./src/styles/common";

import AppCenter from "./src/AppCenter";

import config from "./app.json";

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

global.config = config;
global.appcenter = new AppCenter();

/**
 * Temp work around according to Dan Abramov answer at https://github.com/facebook/react-native/issues/18868
 */
if (__DEV__) {
  YellowBox.ignoreWarnings([
    "Warning: isMounted(...) is deprecated",
    "Module RCTImageLoader requires main queue"
  ]);
}

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
