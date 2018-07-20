import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default class SubjectBadge extends Component {
  render() {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          this.props.hasOwnProperty("onPress") && this.props.onPress()
        }
      >
        <View style={[styles.item, this.props.style]}>
          <Text style={styles.itemText}>{this.props.title}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

SubjectBadge.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string
};
