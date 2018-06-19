import React, { Component } from "react";
import { View, Text } from "react-native";

import Navigator from "../Navigator/Navigator";

export default class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator />
      </View>
    );
  }
}
