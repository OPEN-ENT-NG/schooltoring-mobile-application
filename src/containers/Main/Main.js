import React, { Component } from "react";
import { View } from "react-native";

import Navigator from "../Navigator/Navigator";
import NavigationService from "../../api/Navigation";

export default class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          ref={navigatorRef => NavigationService.register(navigatorRef)}
        />
      </View>
    );
  }
}
