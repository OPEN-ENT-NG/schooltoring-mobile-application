import React, { Component } from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default class SecondaryButton extends Component {
  render() {
    if (this.props.children) {
      var children = this.props.children;
    } else {
      var children = <Text style={styles.buttonText}>{this.props.title}</Text>;
    }

    return (
      <TouchableOpacity
        style={[this.props.style || {}, styles.button]}
        onPress={() => this.props.onPress()}
        hitSlop={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10
        }}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

SecondaryButton.propTypes = {
  children: PropTypes.element,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  title: PropTypes.string
};
