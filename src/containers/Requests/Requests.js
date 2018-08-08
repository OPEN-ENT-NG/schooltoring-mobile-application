import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Requests extends Component {
  constructor(props) {
    super(props);
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
