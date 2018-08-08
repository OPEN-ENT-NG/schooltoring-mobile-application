import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View>
        <Text>Messages</Text>
      </View>
    );
  }
}
