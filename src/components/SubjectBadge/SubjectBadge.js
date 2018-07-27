import React, { Component } from "react";
import {
  View,
  Text} from "react-native";
import PropTypes from "prop-types";

import Touchable from "../Touchable/Touchable";

import styles from "./styles";

export default class SubjectBadge extends Component {
  render() {
    return (
      <Touchable
        onPress={() =>
          this.props.hasOwnProperty("onPress") && this.props.onPress()
        }
      >
        <View style={[styles.item, this.props.style]}>
          <Text style={styles.itemText}>{this.props.title}</Text>
        </View>
      </Touchable>
    );
  }
}

SubjectBadge.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string.isRequired
};
