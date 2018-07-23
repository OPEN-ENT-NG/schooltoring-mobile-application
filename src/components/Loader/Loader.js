import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

import { COLORS } from "../../styles/common";
import styles from "./styles";

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.SECONDARY} size={"large"} />
      </View>
    );
  }
}
