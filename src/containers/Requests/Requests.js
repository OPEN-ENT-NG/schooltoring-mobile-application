import React, { Component } from "react";
import { View, Text, Platform, StatusBar } from "react-native";

import { COLORS } from "../../styles/common";

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" &&
        StatusBar.setBackgroundColor(COLORS.BACKGROUND);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View>
        <Text>Request</Text>
      </View>
    );
  }
}
